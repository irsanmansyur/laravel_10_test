<?php

namespace App\Http\Controllers;

use App\Http\Requests\NasabahStoreRequest;
use App\Models\Nasabah;
use Illuminate\Http\Request;

class NasabahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nasabahs = Nasabah::paginate(10);
        return response()->json([
            "message" => "Daftar Nasabah",
            "data" => $nasabahs->toArray()['data']
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NasabahStoreRequest $nasabahStoreRequest)
    {
        $nasabah = Nasabah::create($nasabahStoreRequest->validated());
        return response()->json([
            "message" => "Nasabah created",
            "data" => $nasabah,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
