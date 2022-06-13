import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const useDocument = (collection, id) => {
  let error = ref(null);
  let isPending = ref(false);

  let docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      isPending = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending = false;
      error.value = "Could not delete the document";
    }
  };

  return { error, isPending, deleteDoc };
};

export default useDocument;
