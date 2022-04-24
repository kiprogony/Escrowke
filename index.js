  window.onscroll = () => {
      var nav = document.querySelector('nav');

      if (window.pageYOffset > 0) {
        nav.classList.add("sticky")
      }
      else {
        nav.classList.remove("sticky");
      }
    }
 function showPreview(event) {
    if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("file-ip-1-preview");
    preview.src = src;
    preview.style.display = "block";
        }
     }
    
   const form=document.querySelector('form');
    form.addEventListener('submit',async (e)=>{
      e.preventDefault()
      const amount=form.amount.value

      try {
        const res=await fetch("/index.html",{
           method:'POST',
            headers:{'Content-Type':'application/json'},
             body:JSON.stringify({amount})


         })
                console.log(res.body);
      } catch (error) {
                console.log(error);
  }
})