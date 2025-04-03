# Generated by Django 5.1.7 on 2025-03-27 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto_inv', '0006_rename_lugar_publicacion_articulo_enlace_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='evento',
            name='esatus',
        ),
        migrations.AddField(
            model_name='evento',
            name='descripcion',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='evento',
            name='organizador',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='evento',
            name='ubicacion',
            field=models.CharField(default='', max_length=255),
        ),
    ]
