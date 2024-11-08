/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=3`
  );
  return response.data;
};

const ProductList = ({ detailShow }) => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }], // cashing key
    queryFn: retrieveProducts, // data fecthing function
  });
  const queryClint = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      axios.delete(`http://localhost:3000/products/${id}`);
    },
    onSuccess: () => {
      queryClint.invalidateQueries(["products"]);
    },
  });

  const handelDelete = (id) => {
    if (confirm("Are you sure?")) {
      mutation.mutate(id);
      mutation.isSuccess && toast.success("Delete successfully");
    }
    return;
  };

  if (isLoading) return <div>Fetching Products...</div>;
  if (error) return <div>An error occured: {error.message}</div>;
  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <div
              className="flex justify-center items-center flex-col"
              key={product.id}
            >
              <li
                onClick={() => detailShow(product.id)}
                className="flex flex-col items-center m-2 border rounded-sm"
              >
                <img
                  className="object-cover h-64 w-96 rounded-sm"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <p className="text-xl my-3">{product.title}</p>
              </li>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handelDelete(product.id);
                }}
                className="bg-red-500  px-4 py-2 rounded-md text-white mb-2"
              >
                Delete
              </button>
            </div>
          ))}
      </ul>
      <div className="flex">
        {products.prev && (
          <button
            onClick={() => setPage(products.prev)}
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            onClick={() => setPage(products.next)}
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
          >
            Next
          </button>
        )}

        <button className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm">
          Total pages... {products.pages}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
