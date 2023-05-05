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
    public function index(Request $request)
    {
        $nasabahs = Nasabah::paginate(10);
        if (!$request->is('inertia*') && $request->expectsJson())
            return response()->json([
                "message" => "Daftar Nasabah",
                "data" => $nasabahs->toArray()['data']
            ]);
        return inertia("Nasabah/List", ["nasabahs" => $nasabahs]);
    }

    public function create(Request $request)
    {
        return inertia("Nasabah/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NasabahStoreRequest $nasabahStoreRequest)
    {
        $nasabah = Nasabah::create($nasabahStoreRequest->validated());
        if (!$nasabahStoreRequest->is('inertia*') && $nasabahStoreRequest->expectsJson())
            return response()->json([
                "message" => "Nasabah created",
                "data" => $nasabah,
            ], 201);
        return to_route("nasabah.list")->with("success", "Nasabah Create");
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
    public function destroy(Nasabah $nasabah)
    {
        $nasabah->delete();
        return to_route("nasabah.list")->with("success", "Nasabah telah dihapus");
    }
}
