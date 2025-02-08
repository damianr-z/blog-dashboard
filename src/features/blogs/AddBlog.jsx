import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from '../../services/apiBlogs'

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
// import Button from '../../ui/Button';
// import CreateCabinForm from './CreateCabinForm';
// import Modal from '../../ui/Modal';

// function AddCabin() {
//   return (
//     <div>
//     <Modal>
//       <Modal.Open opens="cabin-form">
//         <Button>Add new cabin</Button>
//       </Modal.Open>
//       <Modal.Window name="cabin-form">
//         <CreateCabinForm />
//       </Modal.Window>
//     </Modal>
//     </div>
//   );
// }


// export default AddCabin;
