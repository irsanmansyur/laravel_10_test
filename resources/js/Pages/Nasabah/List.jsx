import ButtonCustom from "@/Components/form/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function List({ auth, nasabahs }) {
  const { setData, data, delete: deleteNasabah, processing } = useForm({ id: null });
  const handleDelete = (e) => {
    e.preventDefault();
    if (processing) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNasabah("nasabah/delete/" + data.id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nasabah</h2>}>
      <Head title="Daftar Nasabah" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="head flex justify-between p-4 items-center border-b">
              <h3 className="">List Nasabah</h3>
              <Link href="/nasabah/create">Create</Link>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Points
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nasabahs.data.map((nasabah, i) => {
                          return (
                            <tr className="border-b dark:border-neutral-500" key={i}>
                              <td className="whitespace-nowrap px-6 py-4 font-medium">{nasabahs.from + i}</td>
                              <td className="whitespace-nowrap px-6 py-4">{nasabah.name}</td>
                              <td className="whitespace-nowrap px-6 py-4">{nasabah.points}</td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <form onSubmit={handleDelete}>
                                  <ButtonCustom className="bg-red-500  hover:bg-red-600" type="submit" onClick={(e) => setData("id", nasabah.id)}>
                                    Delete
                                  </ButtonCustom>
                                </form>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
