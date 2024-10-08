# Activity Delegator Application - ES
## Descripción General
La aplicación Activity Delegator permite a los usuarios asignar de manera aleatoria actividades a un grupo de participantes, optimizando la distribución equitativa de tareas. Este sistema garantiza que no se repitan los mismos participantes para las mismas actividades durante al menos tres días, siempre y cuando la cantidad de actividades y participantes lo permita.

La vista principal muestra dos listas: una de actividades y otra de participantes. Los usuarios pueden realizar el sorteo para delegar actividades, imprimir los resultados o ver el historial de sorteos anteriores. Los sorteos pueden visualizarse tanto en una tabla como en gráficos de torta, que muestran la cantidad de veces que cada participante ha sido seleccionado para una actividad específica.

## Gestión de Actividades y Participantes
Además de realizar sorteos, la aplicación incluye un completo sistema de gestión de actividades y participantes. Los usuarios pueden:

Agregar o eliminar participantes: Puedes gestionar los participantes directamente desde la vista principal. Para agregar un nuevo participante, utiliza el campo de entrada disponible. Para eliminar un participante, simplemente haz clic en el botón ubicado junto a cada nombre en la lista.

Asignar actividades manualmente: En caso de que el usuario desee asignar directamente una actividad a un participante específico, se puede eliminar la actividad y los participantes del sorteo antes de realizarlo.

Carga masiva de datos: Es posible cargar de manera eficiente todas las actividades a través de un formulario con selecciones múltiples que involucran a todos los participantes.

Borrar datos de tablas: Los usuarios pueden eliminar fácilmente los datos almacenados, como actividades y participantes, directamente desde la tabla de gestión.

## Funcionalidades adicionales
Historial de Sorteos: Se puede acceder a un historial detallado de los sorteos previos, facilitando el seguimiento de las asignaciones.

Visualización Gráfica: Los gráficos de torta permiten ver de manera clara la cantidad de veces que cada participante ha sido seleccionado en cada actividad.

# 1. Vista Principal: Sorteo de Actividades y Gestión de Actividades y Participantes
## Descripción
La vista principal permite gestionar los sorteos de actividades y la administración de participantes. Desde esta pantalla, los usuarios pueden ver dos listas: una de actividades y otra de participantes, y realizar sorteos de manera aleatoria o asignar tareas manualmente. Aunque no es posible agregar nuevas actividades, sí se pueden eliminar, y los usuarios pueden cargar nuevos participantes en el sistema.

## Elementos principales
Lista de Actividades: Muestra todas las actividades disponibles que pueden ser asignadas a los participantes. Las actividades existentes pueden ser eliminadas.

Lista de Participantes: Muestra todos los participantes disponibles para el sorteo. Nuevos participantes pueden ser añadidos a esta lista.

Formulario de Gestión de Participantes: Incluye un campo de entrada para agregar nuevos participantes al sistema.

## Botones
Sortear: Inicia el proceso de sorteo aleatorio, asignando una actividad a cada participante de manera equitativa.

Agregar Participante: Permite añadir nuevos participantes mediante el campo de entrada disponible debajo de la lista de participantes.

Borrar Actividad/Participante: Permite eliminar una actividad o participante seleccionado mediante los botones de "delete" ubicados al costado de cada elemento en la lista.

Imprimir: Permite imprimir la lista de participantes para almacenamiento físico o control de asistencia.

Ver Historia: Abre una vista detallada con el historial de sorteos anteriores, incluyendo gráficos de torta y tablas con las asignaciones previas.

# 2. Vista de Carga Manual
## Descripción
Esta vista facilita la carga manual de datos. Los usuarios pueden cargar múltiples actividades y asignarles varios participantes a través de un formulario con selección múltiple.

## Elementos principales
Formulario de Carga Manual: Permite seleccionar múltiples actividades y participantes para ingresarlos al sistema de manera eficiente.
## Botones
Confirmar: Realiza la carga de las actividades y los participantes seleccionados. Además, cuenta con una validación que obliga a seleccionar al menos una opción en cada select. Si no hay participantes disponibles para una actividad, debe seleccionarse la opción "Vacío".

# 3. Vista de Historial
## Descripción
Aquí los usuarios pueden ver el historial completo de los sorteos realizados. Los resultados se muestran en forma de tablas.

## Elementos principales
Tabla de Historial: Muestra una lista cronológica de los sorteos anteriores, indicando qué participantes fueron asignados a cada actividad.

## Botones
Agregar dato manualmente: Abre un diálogo para ingresar los datos de todas las actividades de forma manual a través de selects múltiples.

Visualizar data: Abre un nuevo componente que muestra los gráficos de tortas para visualizar la distribución de los participantes en las actividades.

Eliminar dato: Permite borrar un dato específico de la lista de historial, disponible al lado de cada entrada en la tabla.

# 4. Vista de Visualización Gráfica
## Descripción
Esta vista proporciona gráficos para visualizar la distribución de los participantes en las actividades, facilitando el análisis de los sorteos realizados.

## Elementos principales
Gráfico de Torta por actividad: Proporciona una visualización gráfica que muestra la cantidad de veces que cada participante ha sido asignado a una actividad.

# Activity Delegator Application - EN

## General Description
The Activity Delegator application allows users to randomly assign activities to a group of participants, optimizing the fair distribution of tasks. This system ensures that the same participants do not repeat for the same activities for at least three days, as long as the number of activities and participants allows it.

The main view displays two lists: one of activities and another of participants. Users can conduct the lottery to delegate activities, print results, or view the history of previous lotteries. The draws can be displayed both in a table and in pie charts, showing the number of times each participant has been selected for a specific activity.

## Management of Activities and Participants
In addition to conducting draws, the application includes a comprehensive system for managing activities and participants. Users can:

Add or remove participants: You can manage participants directly from the main view. To add a new participant, use the input field available. To remove a participant, simply click the button next to each name in the list.

Manually assign activities: In case the user wishes to directly assign an activity to a specific participant, they can remove the activity and participants from the lottery before conducting it.

Bulk data loading: It is possible to efficiently load all activities through a form with multiple selections involving all participants.

Delete table data: Users can easily delete stored data, such as activities and participants, directly from the management table.

## Additional Features
Lottery History: Users can access a detailed history of previous draws, facilitating the tracking of assignments.

Graphical Visualization: Pie charts allow for a clear view of how many times each participant has been selected for each activity.

# 1. Main View: Activity Lottery and Management of Activities and Participants
## Description
The main view allows the management of activity draws and participant administration. From this screen, users can see two lists: one of activities and another of participants, and conduct random draws or manually assign tasks. Although it is not possible to add new activities, existing ones can be deleted, and users can load new participants into the system.

## Main Elements
Activity List: Displays all available activities that can be assigned to participants. Existing activities can be deleted.

Participant List: Displays all available participants for the lottery. New participants can be added to this list.

Participant Management Form: Includes an input field to add new participants to the system.

## Buttons
Draw: Initiates the random draw process, assigning an activity to each participant equitably.

Add Participant: Allows the addition of new participants via the input field available below the participant list.

Delete Activity/Participant: Allows the deletion of a selected activity or participant through the "delete" buttons located next to each item in the list.

Print: Allows printing the list of participants for physical storage or attendance control.

View History: Opens a detailed view with the history of previous draws, including pie charts and tables with prior assignments.

# 2. Manual Upload View
## Description
This view facilitates manual data entry. Users can load multiple activities and assign them various participants through a multi-select form.

## Main Elements
Manual Upload Form: Allows selecting multiple activities and participants for efficient entry into the system.
## Buttons
Confirm: Performs the loading of the selected activities and participants. It also includes validation that requires at least one option to be selected in each select. If there are no participants available for an activity, the "Empty" option must be selected.
# 3. History View
## Description
Here users can view the complete history of the conducted lotteries. The results are displayed in tables.

## Main Elements
History Table: Displays a chronological list of previous draws, indicating which participants were assigned to each activity.
## Buttons
Manually Add Data: Opens a dialog to enter all activity data manually through multiple selects.

Visualize Data: Opens a new component that displays pie charts to visualize the distribution of participants in activities.

Delete Data: Allows the deletion of a specific data entry from the history list, available next to each entry in the table.

# 4. Graphical Visualization View
## Description
This view provides graphs to visualize the distribution of participants in activities, facilitating the analysis of conducted draws.

## Main Elements
Pie Chart by Activity: Provides a graphical visualization that shows how many times each participant has been assigned to an activity.


