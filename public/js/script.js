const hamBurger = document.querySelector(".hamburger");
const container = document.querySelector(".container");
const sidebar = document.querySelector('.sidebar');
hamBurger.addEventListener("click", () => {
    

    // Get the computed styles of the sidebar
    const styles = window.getComputedStyle(sidebar);

    const displayStyle = styles.getPropertyValue('display');

    // Log the display style to the console
    console.log('Display style:', displayStyle);
    // Log the styles to the console
    if(displayStyle === "none"){
        sidebar.style.display = "flex";
    }else{
        sidebar.style.display = "none";
    }

})
window.addEventListener("resize", () => {
    console.log("resizing");
    if(window.innerWidth< 991){
        hamBurger.style.display = "flex";
        sidebar.style.display = "none";
    }else{
        hamBurger.style.display = "none";
        sidebar.style.display = "flex";
    }
});





