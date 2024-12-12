<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$directory = 'asset/img';
$images = array();

if (is_dir($directory)) {
    foreach (new DirectoryIterator($directory) as $file) {
        if ($file->isFile()) {
            $extension = strtolower($file->getExtension());
            if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                $images[] = $file->getFilename();
            }
        }
    }
}

echo json_encode($images);
?>