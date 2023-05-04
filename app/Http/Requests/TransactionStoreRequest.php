<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "account_id" => "required|exists:nasabahs,id",
            "transaction_date" => "required|date_format:Y-m-d H:i:s",
            "description" => "required|string",
            "debit_credit" => "required|in:D,C",
            "amount"  => "required|numeric|min:0"
        ];
    }
}
