<?php

namespace Hynek\Form\Http\Controllers;


use Hynek\Core\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use RuntimeException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UploadController
{
    public function process(Request $request)
    {
        $filename = $request->hasHeader('Upload-Name');
        $chunkOffset = $request->hasHeader('Upload-Offset');

        if ($filename && $chunkOffset) {
            return $this->uploadChunk($request);
        }

        /** @var UploadedFile[] $files */
        $files = $request->allFiles();

        abort_if(empty($files), 422, 'No files were uploaded.');
        abort_if(count($files) > 1, 422, 'Only 1 file can be loaded at a time.');

        $requestKey = array_key_first($files);

        $file = is_array($request->input($requestKey))
            ? $request->input($requestKey)[0]
            : $request->input($requestKey);

        return $file->store(
            path: $this->basePath().'/'.now()->timestamp.'-'.Str::random(28)
        );
    }

    public function restore(Request $request)
    {
        $file = $request->query('restore');

        $this->validateFilename($file);

        return response()->file($this->basePath().'/'.$file());
    }

    public function processChunk(Request $request)
    {
        return $this->uploadChunk($request);
    }

    public function load(Request $request)
    {
        $media = Media::findByUuid($request->query('load'));

        abort_unless(!! $media, 404);

        return $media;
    }

    public function revert(Request $request)
    {
        $file = $request->query('revert');

        $this->validateFilename($file);

        $path = $this->basePath().'/'.$file();

        if (File::exists($path)) {
            File::delete($path);
        }

        return response()->noContent();
    }

    protected function validateFilename(string $filename)
    {
        abort_if(blank($filename), 422, 'No file was requested.');
        abort_if(Str::contains($filename, '..'), 422, 'Invalid file request');

        return true;
    }

    protected function basePath(): string
    {
        $tempDir = storage_path('app/tmp');

        if (! is_dir($tempDir)) {
            if (! mkdir($tempDir, 0777, true) && !is_dir($tempDir)) {
                throw new RuntimeException(sprintf('Directory "%s" was not created', $tempDir));
            }
        }

        return $tempDir;
    }

    protected function uploadChunk(Request $request)
    {
        $filename = $request->header('Upload-Name');
        $chunkOffset = (int) $request->header('Upload-Offset', 0);
        $uploadId = $request->header('Upload-Id') ?? $request->query('patch') ?? Str::uuid()->toString();

        $tempDir = $this->basePath().'/'.$uploadId;
        if (!is_dir($tempDir)) {
            if (!mkdir($tempDir, 0777, true) && !is_dir($tempDir)) {
                throw new RuntimeException(sprintf('Directory "%s" was not created', $tempDir));
            }
        }

        // Append chunk to temp file
        $chunkPath = "{$tempDir}/chunk-{$chunkOffset}";
        file_put_contents($chunkPath, $request->getContent());

        // If this is the last chunk -> assemble
        $uploadLength = (int) $request->header('Upload-Length', 0);
        $currentSize = collect(glob("{$tempDir}/chunk-*"))
            ->sum(fn($file) => filesize($file));

        if ($currentSize >= $uploadLength && $uploadLength > 0) {
            $finalPath = "tmp/{$uploadId}-{$filename}";
            $out = fopen(storage_path("app/{$finalPath}"), 'ab');

            foreach (glob("{$tempDir}/chunk-*") as $chunk) {
                fwrite($out, file_get_contents($chunk));
            }
            fclose($out);

            // Clean up chunks
            array_map('unlink', glob("{$tempDir}/chunk-*"));
            rmdir($tempDir);

            return response($finalPath);
        }

        return response($uploadId); // tell FilePond we're still processing
    }
}
