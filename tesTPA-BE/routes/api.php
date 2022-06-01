<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'article'], function() {
  Route::get('', [PostController::class, 'getAll']);
  Route::post('', [PostController::class, 'postArticle']);
  Route::post('trash/{id}', [PostController::class, 'moveTrash']);
  Route::get('{limit}/{offset}', [PostController::class, 'getArticle']);
  Route::get('{id}', [PostController::class, 'showArticle']);
  Route::put('{id}', [PostController::class, 'updateArticle']);
  Route::delete('{id}', [PostController::class, 'deleteArticle']);
});
