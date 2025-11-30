import {create} from "zustand"


export const useThemeStore = create((set)=>({
    theme:localStorage.getItem("chat-theme") || "light",
    setTheme : (theme)=>{
        console.log(theme)
        localStorage.setItem("chart-theme" , theme)
        set({theme})
    }
    
}))
