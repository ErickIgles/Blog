import os
from django.db import models
from django.utils.text import slugify
from stdimage import StdImageField

import uuid

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4}.{ext}'
    upload_to = 'posts'
    return os.path.join(upload_to, filename)


class Base(models.Model):
    created_at = models.DateField('Criado', auto_now_add=True)
    updated_at = models.DateTimeField('Atualizado', auto_now=True)
    active = models.BooleanField('Ativo', default=True)

    class Meta:
        abstract = True

class CreatePosts(Base):
    title = models.CharField('Título', max_length=240)
    post_content = models.TextField(verbose_name='Conteúdo', blank=True, null=True)
    slug = models.SlugField('Slug', unique=True, max_length=255, blank=True)
    post_image = StdImageField(
        verbose_name='Imagem', 
        upload_to=get_file_path, 
        blank=True, 
        null=True, 
        variations={'thumb': {'width': 300, 'height': 200, 'crop': True}, 
                    'medium': {'width': 800, 'height': 600},
                    'large': {'width': 1200, 'height': 800},
                    }
        )
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
    
    def __str__(self):
        return self.title

