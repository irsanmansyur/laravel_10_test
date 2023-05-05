import ButtonCustom from "@/Components/form/button";
import { InputCustom } from "@/Components/form/inputGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Create({ auth, nasabahs }) {
  const [startDate, setStartDate] = useState(new Date());
  const { data, setData, post } = useForm({
    account_id: nasabahs[0].id,
    startDate,
    transaction_date: startDate,
    description: "",
    debit_credit: "D",
    amount: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ data });
    post("/transaction/create");
  };
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Transaction</h2>}>
      <Head title="Create Transaction" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="head flex justify-between p-4 items-center border-b">
              <h3 className="">Create Transaction</h3>
            </div>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="py-2">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select an Nasabah
                </label>
                <select
                  id="account_id"
                  onChange={(e) => setData("account_id", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {nasabahs.map((nasabah, i) => {
                    return (
                      <option value={nasabah.id} key={nasabah.id}>
                        {nasabah.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <InputCustom label="Description" onChange={(e) => setData("description", e.target.value)} value={data.description} />

              <div className="py-2">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select a Debit Kredit
                </label>
                <select
                  id="debit_credit"
                  onChange={(e) => setData("debit_credit", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {[
                    { id: "D", name: "Debit" },
                    { id: "K", name: "Kredit" },
                  ].map((nasabah, i) => {
                    return (
                      <option value={nasabah.id} key={nasabah.id}>
                        {nasabah.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <InputCustom label="Amount" onChange={(e) => setData("amount", e.target.value)} value={data.amount} type="number" />

              <DatePicker
                selected={data.startDate}
                onChange={(date) => {
                  setData("startDate", date);
                  setData(
                    "transaction_date",
                    `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${
                      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
                    } ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
                      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
                    }`
                  );
                }}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />

              <ButtonCustom type="submit">Save</ButtonCustom>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
