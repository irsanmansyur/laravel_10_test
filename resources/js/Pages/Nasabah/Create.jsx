import ButtonCustom from "@/Components/form/button";
import { InputCustom } from "@/Components/form/inputGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function List({ auth, transactions }) {
  const { data, setData, post } = useForm({
    account_id: "",
    transaction_date: "",
    description: "",
    debit_credit: "",
    amount: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/transaction/create");
  };
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Nasabah</h2>}>
      <Head title="Create Nasabah" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="head flex justify-between p-4 items-center border-b">
              <h3 className="">Create Nasabah</h3>
            </div>
            <form className="p-4" onSubmit={handleSubmit}>
              <InputCustom label="Name" onChange={(e) => setData("name", e.target.value)} value={data.name} />
              <ButtonCustom type="submit">Save</ButtonCustom>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
