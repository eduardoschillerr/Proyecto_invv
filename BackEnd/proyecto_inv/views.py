from django.views import View
from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse
from .forms import EstudianteForm, InvestigadorForm, AreaForm, EventoForm, ProyectoForm, ArticuloForm, LineaForm

from proyecto_inv.models import Usuario,Estudiante, Investigador,Proyecto,Area, Especialidad,Unidad, Linea, DetLinea, Articulo, Evento, DetProy, DetEvento, Proyecto, DetProy, DetEvento,DetArt, Carrera, TipoEstudiante, TipoEvento, NivelEdu, NivelSNII

from django.http.response import JsonResponse
from django.views.generic import ListView, DetailView

from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from rest_framework import status
import logging


from .serielizers import  EstudianteSerializer, InvestigadorSerializer, AreaSerializer, EspecialidadesSerializer, UnidadesSerializer, ProyectosSerializer, EventosSerializer, ArticulosSerializer, AreasSerializer, LineasInvestigacionSerializer, DetProySerielizer, DetArtSerielizer, DetEventoSerializer, DetLineaSerializer, CarreraSerializer, TipoEstudianteSerializer, TipoEventoSerializer, NivelEduSerializer, NivelSNIISerializer, UsuarioSerializer


from django.views import View



from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic import CreateView

#ENDPOINTS FAK
def get_usuarios(request):
    usuarios = Usuario.objects.all().values( 'nombre', 'email')
    return JsonResponse(list(usuarios), safe=False)

def get_areas(request):
    areas = Area.objects.all().values('nombre')
    return JsonResponse(list(areas), safe=False)

def get_niveledu(request):
    niveledu = NivelEdu.objects.all().values('descripcion')
    return JsonResponse(list(niveledu), safe=False)

def get_nivelsnii(request):
    nivelsnii = NivelSNII.objects.all().values('descripcion')
    return JsonResponse(list(nivelsnii), safe=False)

def get_proyectos(request):
    proyectos = Proyecto.objects.all().values('nombre', 'descripcion')
    return JsonResponse(list(proyectos), safe=False)

## ARTICULOS
@api_view(['GET'])
def lista_articulos(request):
    articulos = Articulo.objects.all()
    serializer = ArticulosSerializer(articulos, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT'])
def articulos_detail(request, id):
    try:
        articulo = Articulo.objects.get(id=id)
    except Articulo.DoesNotExist:
        return Response({"error": "Articulo no encontrado"}, status=404)

    if request.method == 'GET':
        serializer = ArticulosSerializer(articulo)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ArticulosSerializer(articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
@api_view(['POST'])
def create_articulo(request):
    serializer = ArticulosSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()


         
        

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
        
    

@api_view(['DELETE'])
def delete_articulo(request, id):
    try:
        articulo = Articulo.objects.get(id=id)
        articulo.delete()
        return Response({"message": "Articulo eliminado correctamente"}, status=200)
    except Articulo.DoesNotExist:
        return Response({"error": "Articulo no encontrado"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    


## INVESTIGADOR 
@api_view(['POST'])
def create_investigador(request):
    serializer = InvestigadorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_investigador(request, id):
    try:
        investigador = Investigador.objects.get(id=id)
        investigador.delete()
        return Response({"message": "Investigador eliminado correctamente"}, status=200)
    except Investigador.DoesNotExist:
        return Response({"error": "Investigador no encontrado"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET', 'PUT'])
def investigador_detail(request, id):
    try:
        investigador = Investigador.objects.get(id=id)
    except Investigador.DoesNotExist:
        return Response({"error": "Investigador no encontrado"}, status=404)

    if request.method == 'GET':
        serializer = InvestigadorSerializer(investigador)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = InvestigadorSerializer(investigador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

##PROYECTOS
@api_view(['GET', 'PUT'])
def proyectos_detail(request, id):
    try:
        proyecto = Proyecto.objects.get(id=id)
    except Proyecto.DoesNotExist:
        return Response({"error": "Proyecto no encontrado"}, status=404)

    if request.method == 'GET':
        serializer = ProyectosSerializer(proyecto)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ProyectosSerializer(proyecto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def listar_proyectos(request):
    proyectos = Proyecto.objects.all()
    serializer = ProyectosSerializer(proyectos, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def create_proyecto(request):
    serializer = ProyectosSerializer(data=request.data)
    if serializer.is_valid():
        proyecto = serializer.save()  # Guarda el proyecto

        # Registrar relaciones en DetProy
        investigadores_ids = request.data.get('investigadores', [])
        for investigador_id in investigadores_ids:
            try:
                investigador = Investigador.objects.get(id=investigador_id)
                DetProy.objects.create(proyecto=proyecto, investigador=investigador)
            except Investigador.DoesNotExist:
                return Response({"error": f"Investigador con id {investigador_id} no encontrado"}, status=400)

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def update_proyecto(request, id):
    try:
        proyecto = Proyecto.objects.get(id=id)
    except Proyecto.DoesNotExist:
        return Response({"error": "Proyecto no encontrado"}, status=404)

    serializer = ProyectosSerializer(proyecto, data=request.data)
    if serializer.is_valid():
        proyecto = serializer.save()  # Actualiza el proyecto

        # Actualizar relaciones en DetProy
        investigadores_ids = request.data.get('investigadores', [])
        DetProy.objects.filter(proyecto=proyecto).delete()  # Eliminar relaciones existentes
        for investigador_id in investigadores_ids:
            try:
                investigador = Investigador.objects.get(id=investigador_id)
                DetProy.objects.create(proyecto=proyecto, investigador=investigador)
            except Investigador.DoesNotExist:
                return Response({"error": f"Investigador con id {investigador_id} no encontrado"}, status=400)

        return Response(serializer.data)
    return Response(serializer.errors, status=400)
    

## AREAS

@api_view(['POST'])
def create_area(request):
    serializer = AreasSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_area(request, id):
    try:
        areas = Area.objects.get(id=id)
        areas.delete()
        return Response({"message": "Investigador eliminado correctamente"}, status=200)
    except Investigador.DoesNotExist:
        return Response({"error": "Investigador no encontrado"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)



@api_view(['GET'])
def lista_articulos(request):
    articulos = Articulo.objects.all()
    serializer = ArticulosSerializer(articulos, many=True)
    return Response(serializer.data)






## dashboar
from django.http import JsonResponse
from proyecto_inv.models import Investigador, Estudiante


@api_view(['GET'])
def investigador_stats(request, id):
    try:
        investigador = Investigador.objects.get(id=id)
        estudiantes = Estudiante.objects.filter(investigador=investigador)

        # Asignar puntos a cada estado
        puntos_por_estado = {
            'Activo': 1,
            'Desertor': 0,
            'Egresado': 3,
            'Titulado': 5,
        }

        # Agrupar por estado y calcular puntos
        estadisticas = {}
        for estudiante in estudiantes:
            estado = estudiante.esatus
            puntos = puntos_por_estado.get(estado, 0) 
            if estado in estadisticas:
                estadisticas[estado] += puntos
            else:
                estadisticas[estado] = puntos

        
        data = {
            "estudiantes": [{"estado": estado, "puntos": puntos} for estado, puntos in estadisticas.items()]
        }

        return Response(data)
    except Investigador.DoesNotExist:
        return Response({"error": "Investigador no encontrado"}, status=404)

@api_view(['GET'])
def proyecto_stats(request, id):
    try:
        investigador = Investigador.objects.get(id=id)
        proyectos = Proyecto.objects.filter(detproy__investigador=investigador)  # Relación a través de DetProy

        # Asignar puntos a cada estado
        puntos_por_estado = {
            'En proceso': 3,
            'Terminado': 7,
            'Instalado en sitio': 10,
        }

        
        estadisticas = {}
        for proyecto in proyectos:
            estado = proyecto.esatus
            puntos = puntos_por_estado.get(estado, 0)  
            if estado in estadisticas:
                estadisticas[estado] += puntos
            else:
                estadisticas[estado] = puntos

        
        data = {
            "proyectos": [{"estado": estado, "puntos": puntos} for estado, puntos in estadisticas.items()]
        }

        return Response(data)
    except Investigador.DoesNotExist:
        return Response({"error": "Investigador no encontrado"}, status=404)
    
@api_view(['GET'])
def evento_stats(request, id):
    try:
        investigador = Investigador.objects.get(id=id)
        eventos = Evento.objects.filter(detevento__investigador=investigador)  # Relación a través de DetEvento

        
        puntos_por_tipo = {
            'Congreso': 5,
            'Taller': 3,
            'Conferencia': 4,
            'Diplomado': 7,
            'Charla': 2,
        }

        
        estadisticas = {}
        for evento in eventos:
            tipo = evento.tipo_evento  
            puntos = puntos_por_tipo.get(tipo, 0)  
            if tipo in estadisticas:
                estadisticas[tipo] += puntos
            else:
                estadisticas[tipo] = puntos

        
        data = {
            "eventos": [{"tipo": tipo, "puntos": puntos} for tipo, puntos in estadisticas.items()]
        }

        return Response(data)
    except Investigador.DoesNotExist:
        return Response({"error": "Investigador no encontrado"}, status=404)



## LOGIN ##
logger = logging.getLogger(__name__)
@api_view(['POST'])
def login_view(request):
    """
    Vista mejorada de login con mejor depuración
    """
    # Log para ver qué datos están llegando
    logger.info(f"Datos recibidos: {request.data}")
    
    # Obtener credenciales
    nombre = request.data.get('nombre')
    password = request.data.get('password')
    
    # Validar que se recibieron los datos necesarios
    if not nombre:
        logger.error("Falta el nombre de usuario")
        return Response({'error': 'El nombre de usuario es requerido'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    if not password:
        logger.error("Falta la contraseña")
        return Response({'error': 'La contraseña es requerida'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Buscar el usuario por nombre
        logger.info(f"Buscando usuario con nombre: {nombre}")
        usuario = Usuario.objects.get(nombre=nombre)
        logger.info(f"Usuario encontrado: {usuario.id}")
        
        # Comparar directamente la contraseña (sin hash)
        if password == usuario.password:
            logger.info("Contraseña correcta")
            # Determinar si el usuario es administrador
            is_admin = usuario.esatus
            
            return Response({
                'message': 'Login exitoso',
                'is_admin': is_admin,
                'user_id': usuario.id,
                'nombre': usuario.nombre,
                'email': usuario.email,
                'esatus': usuario.esatus  # Asegurarse de que este campo esté en la respuesta
            }, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Contraseña incorrecta para el usuario: {nombre}")
            return Response({'error': 'Contraseña incorrecta'}, 
                           status=status.HTTP_401_UNAUTHORIZED)
    except Usuario.DoesNotExist:
        logger.warning(f"Usuario no encontrado: {nombre}")
        return Response({'error': f'Usuario "{nombre}" no encontrado'}, 
                       status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Error en login: {str(e)}")
        return Response({'error': f'Error interno: {str(e)}'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_admin(request):
    """
    Verificar si un usuario es administrador
    """
    try:
        usuario = Usuario.objects.get(id=request.user.id)
        return Response({'is_admin': usuario.esatus})
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado'}, status=404)
    except Exception as e:
        logger.error(f"Error en is_admin: {str(e)}")
        return Response({'error': f'Error interno: {str(e)}'}, 
                       status=status.HTTP_500_INTERNAL_SERVER_ERROR)












## TODAS LAS VIEWS DEL BACKEND

def home(request):
    # Obtén el evento más reciente
    evento_reciente = Evento.objects.order_by('-fecha').first()

    # Obtén el artículo más reciente
    articulo_reciente = Articulo.objects.order_by('-fecha_publicacion').first()

    # Obtén el proyecto más reciente
    proyecto_reciente = Proyecto.objects.order_by('-fecha_inicio').first()

    return render(request, "home.html", {
        'evento_reciente': evento_reciente,
        'articulo_reciente': articulo_reciente,
        'proyecto_reciente': proyecto_reciente
    })

def lineas_investigacion_view(request):
    lineas = Linea.objects.all()
    for linea in lineas:
        # Agregar los investigadores asociados a cada línea
        linea.investigadores = [
            detlinea.investigador for detlinea in DetLinea.objects.filter(linea=linea)
        ]
    return render(request, 'lineas_investigacion.html', {'lineas': lineas})

    

def areas(request):
    return render(request, "areas.html")

class especialidadesListView(ListView):
    model = Especialidad
    template_name = 'especialidades.html'
    context_object_name = 'especialidades'

    def get_queryset(self):
        return Especialidad.objects.all()
    
class especialidadesDetailView(DetailView):
    model = Especialidad
    template_name = 'especialidades_det.html'
    context_object_name = 'especialidad'
    # # se le da el contexto de los investigadores que tiene la especialidad a la vista
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        especialidad = self.object  
        context['investigadores'] = Investigador.objects.filter(especialidad=especialidad)
        return context


def proyectos(request):
    area_id = request.GET.get('area')  # Obtén el área seleccionada del parámetro GET
    if area_id:
        proyectos = Proyecto.objects.filter(Area_id=area_id)  # Filtra por área
    else:
        proyectos = Proyecto.objects.all()  # Muestra todos los proyectos si no hay filtro

    areas = Area.objects.all()  # Obtén todas las áreas para el filtro

    for proyecto in proyectos:
        proyecto.investigadores = [
            DetProy.investigador for DetProy in DetProy.objects.filter(proyecto=proyecto)
        ]

    return render(request, 'proyectos.html', {'proyectos': proyectos, 'areas': areas})



def articulos(request):
    area_id = request.GET.get('area')  
    if area_id:
        articulos = Articulo.objects.filter(Area_id=area_id)  
    else:
        articulos = Articulo.objects.all()  

    areas = Area.objects.all()  

    # Agrega los investigadores asociados a cada artículo
    for articulo in articulos:
        articulo.investigadores = [
            detart.investigador for detart in DetArt.objects.filter(articulo=articulo)
        ]

    return render(request, 'articulos.html', {'articulos': articulos, 'areas': areas})






class InvestigadorListView(ListView):
    model = Investigador
    template_name = 'investigadores.html'
    context_object_name = 'investigadores'
    
    def get_queryset(self):
        
        return Investigador.objects.filter(esatus=True)

class InvestigadorDetailView(DetailView):
    model = Investigador
    template_name = 'investigadores_det.html'
    context_object_name = 'investigador'
    # se le da el contexto de los articulos, proyectos y estudiantes que tiene el investigador a la vista
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        investigador = self.object  
        context['articulos'] = investigador.articulos.all()
        context['proyectos'] = Proyecto.objects.filter(investigador=investigador)
        context['estudiantes'] = Estudiante.objects.filter(investigador=investigador)
        return context


# vista estudiantes se muestra una lista de todos y una brra de busqueda para filtrar por nombre   
def estudiantes(request):

     query = request.GET.get('q')  # Obten el término de búsqueda de la barra de búsqueda
     if query:
         estudiantes = Estudiante.objects.filter(nombre__icontains=query)  # Filtra por nombre
     else:
         estudiantes = Estudiante.objects.all() 
     return render(request, 'Estudiante.html', {'estudiantes': estudiantes})


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

class InvestigadorViewSet(viewsets.ModelViewSet):
    queryset = Investigador.objects.all()
    serializer_class = InvestigadorSerializer

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class EspecialidadesViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadesSerializer

class UnidadesViewSet(viewsets.ModelViewSet):
    queryset = Unidad.objects.all()
    serializer_class = UnidadesSerializer

class ProyectosViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectosSerializer

class EventosViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventosSerializer

class ArticulosViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticulosSerializer

class DetProyViewSet(viewsets.ModelViewSet):
    queryset = DetProy.objects.all()
    serializer_class = DetProySerielizer

class DetArtViewSet(viewsets.ModelViewSet):
    queryset = DetArt.objects.all()
    serializer_class = DetArtSerielizer

class AreasViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreasSerializer

class LineasInvestigacionViewSet(viewsets.ModelViewSet):
    queryset = Linea.objects.all()
    serializer_class = LineasInvestigacionSerializer

class DetEventoViewSet(viewsets.ModelViewSet):
    queryset = DetEvento.objects.all()
    serializer_class = DetEventoSerializer

class DetLineaViewSet(viewsets.ModelViewSet):
    queryset = DetLinea.objects.all()
    serializer_class = DetLineaSerializer

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer

class TipoEstudianteViewSet(viewsets.ModelViewSet):
    queryset = TipoEstudiante.objects.all()
    serializer_class = TipoEstudianteSerializer

class TipoEventoViewSet(viewsets.ModelViewSet):
    queryset = TipoEvento.objects.all()
    serializer_class = TipoEventoSerializer

class NivelEduViewSet(viewsets.ModelViewSet):
    queryset = NivelEdu.objects.all()
    serializer_class = NivelEduSerializer

class NivelSNIIViewSet(viewsets.ModelViewSet):
    queryset = NivelSNII.objects.all()
    serializer_class = NivelSNIISerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    






def eventos(request):
    area_id = request.GET.get('area')  # Obtén el área seleccionada del filtro
    if area_id:
        eventos = Evento.objects.filter(Area_id=area_id)  # Filtra eventos por área
    else:
        eventos = Evento.objects.all()  # Muestra todos los eventos si no hay filtro

    areas = Area.objects.all()
    return render(request, 'eventos.html', {'eventos': eventos, 'areas': areas})




class UnidadesListView(ListView):
    model = Unidad
    template_name = 'unidades.html'
    context_object_name = 'unidades'

    def get_queryset(self):
        return Unidad.objects.all()
    



def gestion_general(request):
    # Diccionario para mapear entidades con sus formularios y modelos
    entidades = {
        'estudiantes': {'form': EstudianteForm, 'model': Estudiante},
        'investigadores': {'form': InvestigadorForm, 'model': Investigador},
        'areas': {'form': AreaForm, 'model': Area},
        'eventos': {'form': EventoForm, 'model': Evento},
        'proyectos': {'form': ProyectoForm, 'model': Proyecto},
        'articulos': {'form': ArticuloForm, 'model': Articulo},
        'lineas': {'form': LineaForm, 'model': Linea},
    }

    # Obtener la entidad seleccionada del filtro
    entidad_seleccionada = request.GET.get('entidad', 'estudiantes')  # Por defecto, estudiantes
    entidad = entidades.get(entidad_seleccionada)

    if not entidad:
        return redirect('gestion_general')  # Redirige si la entidad no es válida

    # Obtener el formulario y el modelo correspondiente
    FormClass = entidad['form']
    ModelClass = entidad['model']

    # Manejar el formulario para agregar o editar
    if request.method == 'POST':
        form = FormClass(request.POST)
        if form.is_valid():
            form.save()
            return redirect('gestion_general')  # Redirige después de guardar
    else:
        form = FormClass()

    # Obtener todos los registros de la entidad seleccionada
    registros = ModelClass.objects.all()

    return render(request, 'gestion_general.html', {
        'form': form,
        'registros': registros,
        'entidad_seleccionada': entidad_seleccionada,
        'entidades': entidades.keys(),
    })


def eliminar_registro(request, entidad, pk):
    
    entidades = {
        'estudiantes': Estudiante,
        'investigadores': Investigador,
        'areas': Area,
        'eventos': Evento,
        'proyectos': Proyecto,
        'articulos': Articulo,
        'lineas': Linea,
    }

    ModelClass = entidades.get(entidad)
    if not ModelClass:
        return redirect('gestion_general')  # Redirige si la entidad no es válida

    # Obtener el registro a eliminar
    registro = get_object_or_404(ModelClass, pk=pk)

    if request.method == 'POST':
        registro.delete()
        return redirect('gestion_general')  # Redirige después de eliminar

    return render(request, 'confirmar_eliminacion.html', {
        'entidad': entidad,
        'registro': registro,
    })

def editar_registro(request, entidad, pk):
    # Diccionario para mapear entidades con sus formularios y modelos
    entidades = {
        'estudiantes': {'form': EstudianteForm, 'model': Estudiante},
        'investigadores': {'form': InvestigadorForm, 'model': Investigador},
        'areas': {'form': AreaForm, 'model': Area},
        'eventos': {'form': EventoForm, 'model': Evento},
        'proyectos': {'form': ProyectoForm, 'model': Proyecto},
        'articulos': {'form': ArticuloForm, 'model': Articulo},
        'lineas': {'form': LineaForm, 'model': Linea},
    }

    entidad_data = entidades.get(entidad)
    if not entidad_data:
        return redirect('gestion_general')  # Redirige si la entidad no es válida

    ModelClass = entidad_data['model']
    FormClass = entidad_data['form']

    # Obtener el registro a editar
    registro = get_object_or_404(ModelClass, pk=pk)

    if request.method == 'POST':
        form = FormClass(request.POST, instance=registro)
        if form.is_valid():
            form.save()
            return redirect('gestion_general')  # Redirige después de guardar
    else:
        form = FormClass(instance=registro)

    return render(request, 'editar_registro.html', {
        'form': form,
        'entidad': entidad,
        'registro': registro,
    })


class SignUpView(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"