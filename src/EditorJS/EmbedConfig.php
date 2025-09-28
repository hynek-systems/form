<?php

namespace Hynek\Form\EditorJS;

class EmbedConfig extends Config
{
    public function __construct(public array $services = [
        'youtube' => true,
        'facebook' => true,
        'instagram' => true,
        'twitter' => true,
        'twitch-video' => true,
        'twitch-channel' => true,
        'micro' => true,
        'vimeo' => true,
        'gfycat' => true,
        'imgur' => true,
        'aparat' => true,
        'yandex-music-track' => true,
        'yandex-music-album' => true,
        'yandex-music-playlist' => true,
        'coub' => true,
        'codepen' => true,
        'pinterest' => true,
        'github' => true,
    ]) {}
}
