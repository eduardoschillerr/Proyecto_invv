from rest_framework import serializers
from .models import Usuario, DetLinea, DetEvento, DetArt ,DetProy, Estudiante, Investigador, Especialidad, Unidad, Proyecto, Evento, Articulo, Area, Linea, Carrera, TipoEstudiante, TipoEvento, NivelEdu, NivelSNII  # Importa tu modelo

class EstudianteSerializer(serializers.ModelSerializer):
    carrera = serializers.StringRelatedField()

    class Meta:
        model = Estudiante
        fields = '__all__'  # O especifica los campos que deseas incluir

class InvestigadorSerializer(serializers.ModelSerializer):
    area_nombre = serializers.StringRelatedField(source='area.nombre', read_only=True)
    nivel_edu_descripcion = serializers.StringRelatedField(source='nivel_edu.descripcion', read_only=True)
    snii_nivel = serializers.StringRelatedField(source='snii.descripcion', read_only=True)

    estudiantes = EstudianteSerializer(many=True, read_only=True)
    articulos_detalle = serializers.SerializerMethodField()  # Campo personalizado para los artículos
    lineas_detalle = serializers.SerializerMethodField()  
    proyectos_detalle = serializers.SerializerMethodField()


    class Meta:
        model = Investigador
        fields = '__all__'  

    def get_estudiantes(self, obj):
        if obj.estudiantes.exists():
            
            return [{"id": est.id, "nombre": est.nombre, "carrera":est.carrera} for est in obj.estudiantes.all()]
        return []
    
    def get_articulos_detalle(self, obj):
    # Accede a la tabla intermedia DetArt para obtener los artículos relacionados
        det_articulos = DetArt.objects.filter(investigador=obj)
        return [
            {
                "id": det_articulo.articulo.id,
                "titulo": det_articulo.articulo.titulo,
                "fecha_publicacion": det_articulo.articulo.fecha_publicacion,
            }
            for det_articulo in det_articulos
        ]
    
    def get_lineas_detalle(self, obj):
        det_lineas = DetLinea.objects.filter(investigador=obj)
        return [
            {
                "id": det_linea.linea.id,
                "nombre": det_linea.linea.nombre,
            }
            for det_linea in det_lineas
        ]
    
    def get_proyectos_detalle(self, obj):
        det_proyectos = DetProy.objects.filter(investigador=obj)
        return [
            {
                "id": det_proyecto.proyecto.id,
                "nombre": det_proyecto.proyecto.nombre,
                "fecha_inicio": det_proyecto.proyecto.fecha_inicio,
                "fecha_fin": det_proyecto.proyecto.fecha_fin,
            }
            for det_proyecto in det_proyectos
        ]




class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class EspecialidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad

        fields = '__all__'  

class UnidadesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad
        fields = '__all__'  

class ProyectosSerializer(serializers.ModelSerializer):
    investigadores = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Investigador.objects.all(), write_only=True
    )
    area_nombre = serializers.CharField(source='Area.nombre', read_only=True)  # Incluye el nombre del área
    

    class Meta:
        model = Proyecto
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'esatus', 'Area', 'investigadores','area_nombre']

    def create(self, validated_data):
        investigadores_data = validated_data.pop('investigadores', [])
        print("Datos validados:", validated_data)  # Verifica los datos aquí
        print("Investigadores (IDs):", investigadores_data)  # Verifica los IDs de los investigadores

        # Crear el proyecto
        proyecto = Proyecto.objects.create(**validated_data)

        # Crear relaciones en DetProy
        for investigador_id in investigadores_data:
            # Asegúrate de que investigador_id sea un número
            if isinstance(investigador_id, Investigador):
                investigador_id = investigador_id.id  # Extraer el ID si es un objeto
            investigador = Investigador.objects.get(id=investigador_id)
            DetProy.objects.create(proyecto=proyecto, investigador=investigador)

        return proyecto

    def update(self, instance, validated_data):
        # Extraer los IDs de los investigadores
        investigadores_data = validated_data.pop('investigadores', [])
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.fecha_inicio = validated_data.get('fecha_inicio', instance.fecha_inicio)
        instance.fecha_fin = validated_data.get('fecha_fin', instance.fecha_fin)
        instance.esatus = validated_data.get('esatus', instance.esatus)
        instance.Area = validated_data.get('area', instance.Area)
        instance.save()

        # Actualizar relaciones en DetProy
        DetProy.objects.filter(proyecto=instance).delete()
        for investigador_id in investigadores_data:
            investigador = Investigador.objects.get(id=investigador_id)
            DetProy.objects.create(proyecto=instance, investigador=investigador)

        return instance

class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'

class ArticulosSerializer(serializers.ModelSerializer):
    investigadores = serializers.SerializerMethodField()  


    class Meta:
        model = Articulo

        fields = ['id', 'titulo','descripcion', 'fecha_publicacion', 'investigadores','enlace']

    def get_investigadores(self, obj):
        
        det_art = DetArt.objects.filter(articulo=obj)
        return [det.investigador.nombre for det in det_art]

class AreasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        # fields = '__all__' 
        fields = ['id', 'nombre']    

class LineasInvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Linea
        fields = '__all__'  

class DetProySerielizer(serializers.ModelSerializer):
    class Meta:
        model = DetProy 
        fields = '__all__'  
    
class DetArtSerielizer(serializers.ModelSerializer):
    class Meta:
        model = DetArt 
        fields = '__all__'  

class DetEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetEvento 
        fields = '__all__'  

class DetLineaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetLinea 
        fields = '__all__'  

class DetHerrSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetProy 
        fields = '__all__'  

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = '__all__'

class TipoEstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEstudiante

        fields = '__all__' 

class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__' 

class NivelEduSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelEdu
        fields = '__all__'  

class NivelSNIISerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelSNII
        fields = '__all__'  

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'  



 
