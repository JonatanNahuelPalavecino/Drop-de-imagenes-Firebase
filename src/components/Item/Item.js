import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../Firebase/Config";
import { ref, uploadBytes } from "firebase/storage";
import { Loading } from "../Loading/Loading";

export const Item = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false)


  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const handleRemove = (index, e) => {
    e.stopPropagation(); // Evitar que el evento llegue al contenedor del Dropzone
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleUpload = async () => {
      try {

        setLoading(true)

        await Promise.all(
            files.map(async (file) => {
                const storageRef = ref(storage, "/");
                const fileRef = ref(storageRef, file.file.name);
        
                await uploadBytes(fileRef, file.file);
            })
        );
        console.log("Archivo cargado con éxito en Firebase Storage:");

    } catch (error) {
        console.error("Error durante la carga:", error);
    } finally {
        setLoading(false)
    }

    // Limpiar la lista de archivos después de la carga
    setFiles([]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
        <div className="dropzone">
            <p className="dropzone-title">Carga tus imagenes</p>
            <div {...getRootProps()} className="dropzone-file">
                <input {...getInputProps()} />
                {files.length === 0 && <p>Arrastra y suelta los archivos aquí</p>}
                {files.map((file, index) => (
                <div onClick={(e) => e.stopPropagation()} key={index} className="dropzone-item">
                    <img className="dropzone-img" src={file.preview} alt={`File ${index}`} />
                    <p className="dropzone-titleImg">{file.file.name}</p>
                    <button className="dropzone-fileBtn" onClick={(e) => handleRemove(index, e)}>Eliminar</button>
                </div>
                ))}
            </div>
            {files.length > 0 && <button className="dropzone-btn" onClick={handleUpload}>Cargar en Firebase Storage</button>}
        </div>
        {loading && <Loading/>}
    </>
  );
};