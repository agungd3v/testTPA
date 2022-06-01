<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;
use stdClass;

class PostController extends Controller
{
  public function postArticle(Request $request) {
    try {
      $request->validate([
        'title' => 'required|min:20',
        'content' => 'required|min:200',
        'category' => 'required|min:3',
        'status' => 'required|in:publish,draft,thrash'
      ]);

      DB::beginTransaction();

      $post = new Post();
      $post->title = $request->title;
      $post->content = $request->content;
      $post->category = $request->category;
      $post->status = $request->status;
      $post->save();

      DB::commit();
      return response()->json(new stdClass());
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 400);
    }
  }
  
  public function getArticle(Request $request, $limit = 1, $offset = 0) {
    try {
      $posts = Post::when($limit, function($lmt) use ($limit) {
        return $lmt->limit($limit);
      })->when($offset, function($oft) use ($offset) {
        return $oft->offset($offset);
      })->get();

      return response()->json($posts);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 400);
    }
  }
  
  public function showArticle(Request $request, $id) {
    try {
      $post = Post::where('id', $id)->first();

      return response()->json($post);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 400);
    }
  }

  public function updateArticle(Request $request, $id) {
    try {
      $request->validate([
        'title' => 'required|min:20',
        'content' => 'required|min:200',
        'category' => 'required|min:3',
        'status' => 'required|in:publish,draft,thrash'
      ]);

      DB::beginTransaction();

      $post = Post::where('id', $id)->first();
      $post->title = $request->title;
      $post->content = $request->content;
      $post->category = $request->category;
      $post->status = $request->status;
      $post->save();
      
      DB::commit();
      return response()->json(new stdClass());
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 400);
    }
  }

  public function deleteArticle(Request $request, $id) {
    try {
      $post = Post::where('id', $id)->first();
      $post->delete();

      return response()->json(new stdClass());
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 400);
    }
  }

  public function getAll(Request $request) {
    $posts = Post::where('status', $request->status)->orderBy('id', 'desc');
    return DataTables::eloquent($posts)->toJson();
  }

  public function moveTrash(Request $request, $id) {
    try {
      $request->validate(['status' => 'required']);
      DB::beginTransaction();

      $post = Post::where('id', $id)->first();
      $post->status = $request->status;
      $post->save();

      DB::commit();
      return response()->json(new stdClass());
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json([
        'status' => false,
        'message' => $e->getMessage()
      ], 400);
    }
  }
}
