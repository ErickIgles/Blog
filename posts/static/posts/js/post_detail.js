document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.pathname.split('/').filter(Boolean).pop();
    const container = document.getElementById('postagem');
    const mensagem = document.getElementById('mensagem');

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== ''){
            const cookies = document.cookie.split(';');

            for (let cookie of cookies){
                cookie = cookie.trim();

                if (cookie.startsWith(name + '=')){
                    cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/v1/${id}`)
        const post = await response.json()

        container.innerHTML = `
        <h1>${post.title}</h1>
        <img src="${post.post_image}" alt="Imagem de ${post.title}" width="400">
        <p>${post.post_content}</p>

        <div style="display: flex; flex-direction: row; gap: 10px">
            <a href="/posts/update/${id}/"><button>Atualizar</button></a>
            <button type="submit" id="deletar_postagem">Deletar</button>
        </div>`

        
        const btnDeletar = document.getElementById('deletar_postagem');

        btnDeletar.addEventListener('click', async () => {
        
            if(!confirm('Tem certeza que deseja apagar este post?')) return;
            
            try {
                const resp = await fetch(`http://127.0.0.1:8000/api/posts/v1/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json'
                    }
                })

                if (resp.status === 204){
                    mensagem.textContent = 'Post deletado com sucesso!';
                    setTimeout(() => window.location.href = '/posts/', 2000);
                } else {
                    mensagem.textContent = 'Erro ao deletar o post!';
                }

            } catch (error) {
                mensagem.textContent = `Erro: ${error}`;
            }
        })
        
    } catch {
        container.innerHTML = 'Erro ao carregar o post.';
    }
})