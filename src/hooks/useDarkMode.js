import {create} from 'zustand';

// Creamos nuestro estado usando Zustand
const useDarkMode = create((set) => ({
  currentMode: 'light', // Variable para almacenar el tipo actual, light or dark
  setCurrentMode: (newMode) => set({ currentMode: newMode }), // Función para asignar un nuevo valor a currentType
}));
 
export default useDarkMode;