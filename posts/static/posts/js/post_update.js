document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.pathname.split('/').filter(Boolean).pop();
    const form = document.getElementById('form-editar');
    const tituloInput = document.getElementById('titulo');
    const conteudoInput = document.getElementById('conteudo');
    const imagemPreview = document.getElementById('preview-imagem');
    const imagemInput = document.getElementById('imagem');
    const btnAtualizarPost = document.getElementById('atualizar_postagem');
    const mensagem = document.getElementById('mensagem');


    function getCookie(name) {
        let cookieValue = null;
        if(document.cookie && document.cookie !== ''){
            const cookies = document.cookie.split(';');

            for (let cookie of cookies){
                cookie = cookie.trim()

                if(cookie.startsWith(name + '=')){
                    cookieValue = decodeURIComponent(cookie.slice(name.length + 1))
                    break
                }
            }
        }
        return cookieValue;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/v1/${id}/`);
        const post = await response.json();

        tituloInput.value = post.title;
        conteudoInput.value = post.post_content;    
        imagemPreview.src = post.post_image;

        btnAtualizarPost.addEventListener('click', async () =>{
            const formData = new FormData();
            formData.append('title', tituloInput.value);
            formData.append('post_content', conteudoInput.value);

            if (imagemInput.files[0]){
                formData.append('post_image', imagemInput.files[0]);
            }

            try {
                const resp = await fetch(`http://127.0.0.1:8000/api/posts/v1/${id}/`,{
                    method: 'PATCH',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    body: formData
                });
                if (resp.ok)
                mensagem.textContent = 'Post atualizado com sucesso.';
            } catch {
                mensagem.textContent = 'Erro ao atualizar o post!';
            }
        })
    } catch(error) {
        console.log('Erro ao exibit informações:', error);
        mensagem.textContent = 'Erro ao carregar os dados do post.';
    }
});