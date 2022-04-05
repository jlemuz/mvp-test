// async function newFormHandler(event) {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="file"]').value;
//     const post_url = document.querySelector('input[name="file"]').value;
//     const img_url = document.querySelector('input[name="file"]').value;

  
//     const response = await fetch(`/api/posts`, {
//         method: 'POST',
//         body: JSON.stringify({ //different method
//           title,
//           post_url,
//           img_url
//         }),
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
    
//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);