import type { Schema, Struct } from '@strapi/strapi';

export interface CantidadMetrica extends Struct.ComponentSchema {
  collectionName: 'components_cantidad_metricas';
  info: {
    displayName: 'Metrica';
    icon: 'chartCircle';
  };
  attributes: {
    cantidad: Schema.Attribute.Integer;
    etiqueta: Schema.Attribute.String;
  };
}

export interface EventoAprendizajesClave extends Struct.ComponentSchema {
  collectionName: 'components_evento_aprendizajes_claves';
  info: {
    displayName: 'AprendizajesClave';
    icon: 'check';
  };
  attributes: {
    aprendizajes: Schema.Attribute.Blocks;
    Titulo: Schema.Attribute.String;
  };
}

export interface EventoBloqueTexto extends Struct.ComponentSchema {
  collectionName: 'components_evento_bloque_textos';
  info: {
    displayName: 'BloqueTexto';
    icon: 'bold';
  };
  attributes: {
    texto: Schema.Attribute.Blocks;
  };
}

export interface EventoGaleria extends Struct.ComponentSchema {
  collectionName: 'components_evento_galerias';
  info: {
    displayName: 'Galeria';
    icon: 'landscape';
  };
  attributes: {
    ImagenConPie: Schema.Attribute.Component<'evento.imagen-con-pie', true>;
  };
}

export interface EventoImagenConPie extends Struct.ComponentSchema {
  collectionName: 'components_evento_imagen_con_pies';
  info: {
    displayName: 'ImagenConPie';
    icon: 'picture';
  };
  attributes: {
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    pie_de_foto: Schema.Attribute.String;
  };
}

export interface EventoTestimonio extends Struct.ComponentSchema {
  collectionName: 'components_evento_testimonios';
  info: {
    displayName: 'Testimonio';
    icon: 'thumbUp';
  };
  attributes: {
    Cita: Schema.Attribute.Text;
    nombre: Schema.Attribute.String;
    rol: Schema.Attribute.String;
  };
}

export interface HeaderLinkNavegacion extends Struct.ComponentSchema {
  collectionName: 'components_header_link_navegacions';
  info: {
    displayName: 'LinkNavegacion';
    icon: 'code';
  };
  attributes: {
    texto: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ProyectoActividad extends Struct.ComponentSchema {
  collectionName: 'components_proyecto_actividads';
  info: {
    displayName: 'Actividad';
    icon: 'calendar';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
  };
}

export interface ProyectoObjetivo extends Struct.ComponentSchema {
  collectionName: 'components_proyecto_objetivos';
  info: {
    displayName: 'Objetivo';
    icon: 'bulletList';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cantidad.metrica': CantidadMetrica;
      'evento.aprendizajes-clave': EventoAprendizajesClave;
      'evento.bloque-texto': EventoBloqueTexto;
      'evento.galeria': EventoGaleria;
      'evento.imagen-con-pie': EventoImagenConPie;
      'evento.testimonio': EventoTestimonio;
      'header.link-navegacion': HeaderLinkNavegacion;
      'proyecto.actividad': ProyectoActividad;
      'proyecto.objetivo': ProyectoObjetivo;
    }
  }
}
