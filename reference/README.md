# 📝 Contador de Palabras - Herramienta para Escritores

Una elegante aplicación web para analizar textos en español, diseñada específicamente para escritores y creadores de contenido.

## ✨ Características Principales

### 1. **Análisis de Frecuencia de Palabras**
- Cuenta la frecuencia de cada palabra en tu texto
- Muestra el porcentaje de uso de cada palabra
- Ordena las palabras por frecuencia (más comunes primero)
- Compatible con caracteres especiales del español (á, é, í, ó, ú, ñ, ü)

### 2. **Visualización de Frases Contextuales**
- Haz clic en cualquier palabra para ver todas las frases donde aparece
- Las palabras se resaltan en amarillo dentro de cada frase
- Tabla expandible con diseño dropdown elegante
- Muestra el número de frases que contienen cada palabra

### 3. **⚠️ Análisis de Proximidad (¡NUEVO!)**
Detecta cuando palabras importantes se repiten demasiado cerca, ayudándote a mejorar la calidad de tu escritura:

- **Filtro de palabras conectoras**: Automáticamente excluye artículos, preposiciones y conectores comunes en español
- **Sensibilidad ajustable**: Configura si quieres detectar repeticiones en:
  - Frases consecutivas (Alta sensibilidad)
  - Dentro de 2 frases (Media sensibilidad)
  - Dentro de 3 frases (Baja sensibilidad)
- **Longitud mínima de palabra**: Filtra palabras cortas para enfocarte en las más significativas
- **Visualización intuitiva**: Muestra la distancia entre repeticiones y las frases específicas donde ocurren
- **Numeración de frases**: Identifica fácilmente la ubicación de cada repetición en tu texto

### 4. **Estadísticas Completas**
- **Total de palabras**: Cuenta total de palabras en el texto
- **Palabras únicas**: Cantidad de palabras diferentes usadas
- **Número de frases**: Total de oraciones analizadas
- **Caracteres**: Conteo total de caracteres
- **Tiempo de lectura**: Estimación basada en velocidad promedio de lectura en español (220 palabras/min)

### 5. **Herramientas de Productividad**
- **Búsqueda en tiempo real**: Filtra la tabla de palabras mientras escribes
- **Exportación a CSV**: Descarga tus análisis con un solo clic
- **Atajos de teclado**: Presiona Ctrl/Cmd + Enter para analizar rápidamente

### 6. **Diseño Elegante**
- Interfaz moderna con gradientes púrpura
- Animaciones suaves y transiciones elegantes
- Diseño responsive para móviles y tablets
- Tipografía optimizada para lectura
- Tarjetas de estadísticas con efectos visuales

## 🚀 Cómo Usar

1. **Abrir la aplicación**
   - Simplemente abre el archivo `index.html` en cualquier navegador web moderno
   - No requiere instalación ni conexión a internet

2. **Ingresar texto**
   - Escribe o pega tu texto en español en el área de texto
   - El texto puede contener cualquier longitud

3. **Analizar**
   - Haz clic en "Analizar Texto" o presiona Ctrl/Cmd + Enter
   - Espera a que se procesen los resultados

4. **Revisar análisis de proximidad**
   - Revisa las advertencias en la sección naranja superior
   - Ajusta la sensibilidad y filtros según tus necesidades
   - Identifica palabras que podrías querer variar en tu texto

5. **Explorar resultados**
   - Revisa las estadísticas generales en las tarjetas superiores
   - Usa la búsqueda para encontrar palabras específicas
   - Haz clic en cualquier palabra para ver sus contextos de uso

6. **Exportar datos**
   - Haz clic en "📊 Exportar CSV" para descargar un archivo con:
     - Palabra
     - Frecuencia
     - Porcentaje
     - Frase de ejemplo

## 🎨 Casos de Uso

- **Escritores creativos**: Evita repeticiones innecesarias y enriquece tu vocabulario
- **Estudiantes**: Analiza ensayos y trabajos académicos
- **Bloggers**: Optimiza contenido para SEO y legibilidad
- **Periodistas**: Revisa artículos antes de publicar
- **Traductores**: Verifica consistencia terminológica
- **Editores**: Identifica patrones de uso de palabras en textos

## 💡 Consejos para Escritores

1. **Revisa las repeticiones cercanas**: El análisis de proximidad es tu mejor amigo para detectar cacofonías y repeticiones molestas.

2. **Usa la sensibilidad media**: Es el mejor balance para la mayoría de textos. Ajusta según el tipo de contenido.

3. **Palabras con alta frecuencia**: Si una palabra aparece muchas veces, considera usar sinónimos para mayor riqueza léxica.

4. **Exporta tus análisis**: Guarda un CSV para comparar versiones diferentes de tu texto.

5. **Longitud mínima de 4 letras**: Esta configuración ayuda a enfocarte en palabras de contenido, ignorando preposiciones muy cortas.

## 🔧 Requisitos Técnicos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- No requiere conexión a internet
- Funciona completamente offline

## 📊 Filtros de Palabras Conectoras

La aplicación filtra automáticamente más de 100 palabras conectoras comunes en español, incluyendo:

- **Artículos**: el, la, los, las, un, una
- **Preposiciones**: de, a, en, con, por, para, sin
- **Conjunciones**: y, o, pero, que, si, como
- **Verbos auxiliares**: ser, estar, haber
- **Pronombres**: yo, tú, él, ella, me, te, se
- **Adverbios comunes**: muy, más, menos, ya, también
- Y muchas más...

## 🌟 Características Técnicas

- Una sola página HTML autónoma
- Sin dependencias externas
- CSS moderno con gradientes y animaciones
- JavaScript vanilla (sin frameworks)
- Compatible con caracteres Unicode
- Expresiones regulares optimizadas para español

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

**¡Feliz escritura! ✍️**

*Diseñado con amor para la comunidad de escritores en español*

