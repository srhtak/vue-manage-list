import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser;

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = res.ref.getDownloadURL;
    } catch (err) {
      error.value = err.message;
      console.log(err.message);
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
