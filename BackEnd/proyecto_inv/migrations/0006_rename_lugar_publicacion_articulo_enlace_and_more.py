# Generated by Django 5.1.7 on 2025-03-27 01:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyecto_inv', '0005_alter_proyecto_esatus'),
    ]

    operations = [
        migrations.RenameField(
            model_name='articulo',
            old_name='lugar_publicacion',
            new_name='enlace',
        ),
        migrations.RemoveField(
            model_name='articulo',
            name='esatus',
        ),
        migrations.AddField(
            model_name='articulo',
            name='Area',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyecto_inv.area'),
        ),
    ]
