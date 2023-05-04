<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionStoreRequest;
use App\Models\Nasabah;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $date_end = request("date_end") ?? date("Y-m-d H:i:s");
        $transactions = Transaction::when(request()->has("account_id"), function (Builder $b) {
            $b->whereAccountId(request("account_id"));
        })->when(request("date_start"), function (Builder $b) {
            $b->where("transaction_date", ">=", Carbon::parse(request("date_start")));
        })->where("transaction_date", "<=", Carbon::parse($date_end))->paginate(19);
        return response()->json([
            "message" => "List Transaction",
            "data" => $transactions->toArray()['data'],
            "meta" => ["limit" => 19]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionStoreRequest $transactionStoreRequest)
    {
        $data = $transactionStoreRequest->validated();
        $transaction = Transaction::create($data);

        // Proses perhitungan  points
        $points = $this->hitungPoint($data['description'], $data['amount']);
        if ($points > 0) Nasabah::find($data['account_id'])->increment('points', $points);

        return response()->json([
            "message" =>  "Transaction Create",
            "data" =>  $transaction
        ]);
    }

    protected function hitungPoint(string $description, int $amount): int
    {
        if ($description == "Beli pulsa") {
            if ($amount <= 10000) return 0;
            if ($amount <= 30000) return ($amount / 1000) * 1;
            return ($amount / 1000) * 2;
        }

        if ($description == "Bayar Listrik") {
            if ($amount <= 50000) return 0;
            if ($amount <= 100000) return ($amount / 2000) * 1;
            return ($amount / 2000) * 2;
        }
        return 0;
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
