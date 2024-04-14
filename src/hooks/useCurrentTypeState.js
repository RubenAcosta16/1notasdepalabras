import {create} from 'zustand';

// Creamos nuestro estado usando Zustand
const useCurrentTypeState = create((set) => ({
  currentType: '', // Variable para almacenar el tipo actual
  setCurrentType: (newType) => set({ currentType: newType }), // Función para asignar un nuevo valor a currentType
  verbsLength:0,
  setVerbsLength: (newLength) => set({ verbsLength: newLength }),
}));

export default useCurrentTypeState;