const msg = document.getElementById('comprimento');
msg.innerHTML = 'BLOG'


async function buscarPosts() {
    try {
        const resposta = await fetch('http://127.0.0.1:8000/api/posts/v1/');
        const posts = await resposta.json();

        const containerPosts = document.getElementById('sessao-posts');
        
        console.log(posts);
        
        posts.forEach(post => {
            const link = document.createElement('a');
            link.href = `/posts/detail/${post.id}/`;
            link.classList.add('card');
            
            link.innerHTML = `<img src="${post.post_image}" alt="Imagem de ${post.title}" width="200"><br><br>`

            containerPosts.appendChild(link);
        });

    } catch (error) {
        console.log('Erro ao buscar dados:', error);
    }
}

buscarPosts();

