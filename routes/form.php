<?php

use Hynek\Form\Http\Controllers\UploadController;

Route::controller(UploadController::class)->prefix('upload')->group(function() {
    Route::post('process', 'process')->name('upload.process');
    Route::patch('chunk', 'processChunk')->name('upload.chunk');
    Route::get('restore', 'restore')->name('upload.restore');
    Route::get('load', 'load')->name('upload.load');
    Route::delete('revert', 'revert')->name('upload.revert');
});
