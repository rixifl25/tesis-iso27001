// Datos estáticos de la tesis — sin base de datos

const USUARIOS = [
  {
    usuario: 'admin',
    password: 'admin123',
    email: 'admin@demo.com',
    nombre_encargado: 'Cesar Kenec Zuloaga Estrada',
    apellido_encargado: 'Zuloaga Estrada',
    nombre_empresa: 'Universidad de Lima S.A.C.',
    ruc_empresa: '20550066795'
  }
]

const CATEGORIAS = [
  { codigo: 'A.5', nombre: 'Controles Organizacionales' },
  { codigo: 'A.6', nombre: 'Controles de Personas' },
  { codigo: 'A.7', nombre: 'Controles Físicos' },
  { codigo: 'A.8', nombre: 'Controles Tecnológicos' }
]

const CONTROLES = [
  { codigo_control: 'A.5.1',  titulo: 'Políticas de seguridad de la información',                                        codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.2',  titulo: 'Roles y responsabilidades de seguridad de la información',                        codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.10', titulo: 'Uso aceptable de la información y otros activos asociados',                       codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.12', titulo: 'Clasificación de la información',                                                  codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.13', titulo: 'Etiquetado de la información',                                                     codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.14', titulo: 'Transferencia de información',                                                     codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.15', titulo: 'Control de acceso',                                                                codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.16', titulo: 'Gestión de identidad',                                                             codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.17', titulo: 'Información de autenticación',                                                     codigo_seccion: 'A.5' },
  { codigo_control: 'A.5.37', titulo: 'Procedimientos operativos documentados',                                           codigo_seccion: 'A.5' },
  { codigo_control: 'A.6.1',  titulo: 'Selección de personal',                                                            codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.2',  titulo: 'Términos y condiciones de empleo',                                                  codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.3',  titulo: 'Concienciación, educación y formación en seguridad de la información',             codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.4',  titulo: 'Proceso disciplinario',                                                            codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.5',  titulo: 'Responsabilidades tras el cese o cambio de empleo',                                codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.6',  titulo: 'Acuerdos de confidencialidad o no divulgación',                                    codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.7',  titulo: 'Trabajo remoto',                                                                   codigo_seccion: 'A.6' },
  { codigo_control: 'A.6.8',  titulo: 'Reporte de eventos de seguridad de la información',                                codigo_seccion: 'A.6' },
  { codigo_control: 'A.7.1',  titulo: 'Perímetros de seguridad física',                                                   codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.2',  titulo: 'Controles de entrada física',                                                      codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.6',  titulo: 'Trabajar en áreas seguras',                                                        codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.7',  titulo: 'Escritorio despejado y pantalla limpia',                                           codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.8',  titulo: 'Ubicación y protección de los equipos',                                            codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.9',  titulo: 'Seguridad de los activos fuera de las instalaciones',                              codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.10', titulo: 'Soportes de almacenamiento',                                                       codigo_seccion: 'A.7' },
  { codigo_control: 'A.7.14', titulo: 'Eliminación o reutilización segura de los equipos',                                codigo_seccion: 'A.7' },
  { codigo_control: 'A.8.2',  titulo: 'Derechos de acceso privilegiado',                                                  codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.3',  titulo: 'Restricción del acceso a la información',                                          codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.4',  titulo: 'Acceso al código fuente',                                                          codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.5',  titulo: 'Autenticación segura',                                                             codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.7',  titulo: 'Protección contra malware',                                                        codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.12', titulo: 'Prevención de fuga de datos',                                                      codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.13', titulo: 'Respaldo de la información',                                                       codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.15', titulo: 'Registros de actividad',                                                           codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.20', titulo: 'Seguridad de las redes',                                                           codigo_seccion: 'A.8' },
  { codigo_control: 'A.8.24', titulo: 'Uso de la criptografía',                                                           codigo_seccion: 'A.8' }
]

const ALTERNATIVAS_TEXTO = {
  'A.5.1':  ['Se han definido y aprobado políticas de seguridad de la información por la dirección', 'Las políticas están documentadas y publicadas formalmente', 'Se comunican a todo el personal y partes externas relevantes', 'Se revisan periódicamente o ante cambios significativos'],
  'A.5.2':  ['Se han definido y asignado roles y responsabilidades de seguridad de la información', 'Los roles están documentados en la política o procedimientos formales', 'Los responsables conocen y aceptan sus obligaciones', 'Se realizan revisiones periódicas de los roles asignados'],
  'A.5.10': ['Existen políticas o procedimientos de uso aceptable de la información y activos', 'Las políticas incluyen prohibiciones explícitas de uso no autorizado', 'Los usuarios firman aceptación del uso aceptable', 'Se monitorea el cumplimiento de las políticas de uso aceptable'],
  'A.5.12': ['Se ha implementado un esquema de clasificación de la información', 'El esquema incluye criterios claros de clasificación por niveles de confidencialidad', 'Los propietarios de la información clasifican sus activos según el esquema', 'El esquema de clasificación se revisa y actualiza periódicamente'],
  'A.5.13': ['Se han definido procedimientos de etiquetado de la información', 'Los activos de información se etiquetan de acuerdo con la clasificación definida', 'El etiquetado es aplicable tanto a información física como digital', 'Se verifica el cumplimiento del etiquetado en auditorías internas'],
  'A.5.14': ['Existen reglas o procedimientos para la transferencia segura de información', 'Se usan acuerdos formales para transferencias con partes externas', 'Los canales de transferencia están cifrados o protegidos adecuadamente', 'Se registran y monitorean las transferencias de información sensible'],
  'A.5.15': ['Existe una política de control de acceso formalmente definida', 'El acceso a sistemas y datos se otorga según el principio de mínimo privilegio', 'Los derechos de acceso se revisan periódicamente', 'Se documentan y aprueban formalmente las solicitudes de acceso'],
  'A.5.16': ['Existe un proceso formal de gestión de identidades (altas, bajas, modificaciones)', 'Las identidades son únicas por usuario y no se comparten', 'Se gestionan cuentas de servicio y cuentas de administración por separado', 'Las identidades inactivas se deshabilitan o eliminan según procedimiento'],
  'A.5.17': ['Existen requisitos definidos para contraseñas o métodos de autenticación', 'Las contraseñas se almacenan de forma cifrada o hasheada', 'Se requiere cambio de contraseña temporal en el primer inicio de sesión', 'Se implementa autenticación multifactor para accesos críticos'],
  'A.5.37': ['Los procedimientos operativos de seguridad están documentados', 'Los procedimientos están disponibles para el personal que los necesita', 'Se revisan y actualizan los procedimientos ante cambios en los sistemas', 'Existen procedimientos específicos para manejo de incidentes de seguridad'],
  'A.6.1':  ['Se realizan verificaciones de antecedentes del personal antes de la contratación', 'Las verificaciones incluyen referencias laborales e historial delictivo', 'La intensidad de las verificaciones es proporcional al nivel de acceso', 'Las verificaciones se repiten periódicamente para personal con accesos críticos'],
  'A.6.2':  ['El contrato o acuerdo laboral incluye responsabilidades de seguridad de la información', 'Se establece el deber de confidencialidad respecto a la información de la organización', 'Los empleados son informados sobre las consecuencias del incumplimiento', 'Los términos de seguridad aplican también para trabajo temporal y contratistas'],
  'A.6.3':  ['Se realiza formación en seguridad de la información para todo el personal', 'Los programas de concienciación son periódicos y actualizados', 'La formación incluye temas de phishing, ingeniería social y manejo de datos sensibles', 'Se evalúa la efectividad de los programas de concienciación'],
  'A.6.4':  ['Existe un proceso disciplinario formal para incumplimientos de seguridad', 'El proceso disciplinario está documentado y es conocido por el personal', 'Se aplica de forma consistente e imparcial', 'El proceso incluye escalonamiento según la gravedad del incumplimiento'],
  'A.6.5':  ['Existe un proceso formal para gestionar el cese o cambio de empleo', 'Se revocan todos los accesos lógicos y físicos al terminar el vínculo laboral', 'Se recuperan activos y credenciales de la organización en el proceso de baja', 'Se recuerdan las obligaciones de confidencialidad post-empleo'],
  'A.6.6':  ['Se firman acuerdos de confidencialidad o no divulgación con el personal', 'Los acuerdos se extienden a terceros con acceso a información sensible', 'Los acuerdos especifican el alcance y duración de la confidencialidad', 'Los acuerdos se revisan periódicamente para mantener su vigencia y relevancia'],
  'A.6.7':  ['Existen políticas y controles específicos para el trabajo remoto', 'Se protege el acceso remoto mediante VPN o canales cifrados', 'Los dispositivos usados en trabajo remoto cumplen con requisitos de seguridad', 'Se sensibiliza al personal sobre los riesgos adicionales del trabajo remoto'],
  'A.6.8':  ['Existe un mecanismo formal para que el personal reporte eventos de seguridad', 'El personal conoce el canal y procedimiento de reporte de incidentes', 'Se incentiva el reporte sin temor a represalias', 'Los reportes son procesados y respondidos oportunamente'],
  'A.7.1':  ['Existen perímetros de seguridad física definidos para proteger la información', 'Los perímetros incluyen controles de acceso físico como tarjetas, biometría u otros', 'Las áreas sensibles están claramente delimitadas y señalizadas', 'Se realizan inspecciones periódicas de la integridad de los perímetros físicos'],
  'A.7.2':  ['Se controla el acceso físico a las instalaciones y áreas seguras', 'El acceso de visitantes está controlado y registrado', 'Los registros de acceso físico se revisan periódicamente', 'Se utilizan controles de doble autenticación en áreas de alto riesgo'],
  'A.7.6':  ['Existen controles para el trabajo en áreas seguras o sensibles', 'Se prohíbe el uso de equipos fotográficos o de grabación en áreas restringidas', 'El trabajo sin supervisión en áreas seguras está restringido', 'Se supervisa a terceros que requieren acceso temporal a áreas seguras'],
  'A.7.7':  ['Existe una política de escritorio despejado y pantalla limpia', 'Los documentos sensibles se guardan bajo llave cuando no se usan', 'Los equipos se bloquean automáticamente después de un período de inactividad', 'Se verifican periódicamente el cumplimiento de la política en las instalaciones'],
  'A.7.8':  ['Los equipos están ubicados en áreas que minimizan el acceso no autorizado', 'Se protegen los equipos contra amenazas ambientales (temperatura, humedad, etc.)', 'Los equipos críticos tienen alimentación eléctrica redundante o protegida', 'Se controla el acceso físico a servidores y equipos de red'],
  'A.7.9':  ['Existen controles para proteger activos que salen de las instalaciones', 'Se requiere autorización formal para sacar activos fuera de las instalaciones', 'Los activos portátiles tienen cifrado de disco completo', 'Se cuenta con proceso de reporte de pérdida o robo de activos'],
  'A.7.10': ['Se gestiona de forma segura el ciclo de vida de los soportes de almacenamiento', 'Los soportes con información sensible se inventarian y controlan', 'Los soportes se transportan de forma segura cuando es necesario', 'Los soportes en desuso se destruyen o sanitizan antes de su disposición'],
  'A.7.14': ['Existe un procedimiento para la eliminación o reutilización segura de equipos', 'Se verifica que los datos sean completamente eliminados antes de reutilizar o desechar equipos', 'Se utilizan métodos certificados de borrado seguro o destrucción física', 'Se documentan las actividades de disposición de equipos'],
  'A.8.2':  ['Se gestiona y controla el uso de derechos de acceso privilegiado', 'Las cuentas privilegiadas están inventariadas y son únicas por usuario', 'El uso de cuentas privilegiadas se registra y monitorea', 'Los privilegios se asignan según la función y se retiran al cambiar el rol'],
  'A.8.3':  ['El acceso a la información está restringido según la política de control de acceso', 'Se aplica el principio de mínimo privilegio en todos los sistemas', 'Los permisos de acceso se revisan al menos anualmente', 'El acceso a información confidencial requiere autenticación fuerte'],
  'A.8.4':  ['El acceso al código fuente está restringido y controlado', 'Se usa un sistema de control de versiones con autenticación', 'El acceso al código fuente de producción requiere autorización adicional', 'Se registran los cambios y accesos al repositorio de código fuente'],
  'A.8.5':  ['Se implementan procedimientos de autenticación segura en los sistemas', 'Se usa autenticación multifactor para accesos remotos o sistemas críticos', 'Los intentos fallidos de autenticación se limitan y registran', 'Las sesiones inactivas se cierran automáticamente después de un tiempo definido'],
  'A.8.7':  ['Se implementan controles para la protección contra malware', 'Se usa software antimalware actualizado en todos los equipos de usuario', 'Se realizan análisis periódicos o en tiempo real en busca de malware', 'Los usuarios están concienciados sobre los riesgos de malware y phishing'],
  'A.8.12': ['Se implementan controles técnicos de prevención de fuga de datos (DLP)', 'Las herramientas DLP monitorizan el tráfico de red, correo y almacenamiento', 'Se bloquea la copia de información sensible a dispositivos externos no autorizados', 'Se realizan revisiones periódicas de las alertas y eventos DLP'],
  'A.8.13': ['Existe una política y procedimientos de respaldo de la información', 'Los respaldos se realizan con la frecuencia definida en la política', 'Los respaldos se verifican periódicamente para confirmar su integridad y restaurabilidad', 'Los respaldos se almacenan en ubicaciones separadas y protegidas'],
  'A.8.15': ['Se generan y mantienen registros de actividad de los sistemas', 'Los registros incluyen accesos, cambios y eventos de seguridad relevantes', 'Los registros están protegidos contra modificación o eliminación no autorizada', 'Los registros se revisan periódicamente para detectar anomalías'],
  'A.8.20': ['Se implementan controles para proteger la red de la organización', 'La red está segmentada para separar sistemas según su criticidad', 'Se monitorea el tráfico de red para detectar actividades sospechosas', 'El acceso remoto a la red está protegido con cifrado y autenticación fuerte'],
  'A.8.24': ['Existe una política de uso de criptografía para proteger la información', 'Se cifra la información sensible tanto en tránsito como en reposo', 'Se gestionan las claves criptográficas de forma segura', 'Se usan algoritmos y longitudes de clave actualizados y recomendados']
}

const PROPUESTAS = [
  { codigo_control: 'A.5.1',  descripcion: 'Definir, aprobar y publicar políticas de seguridad de la información con revisión anual.' },
  { codigo_control: 'A.5.2',  descripcion: 'Asignar formalmente roles de seguridad con responsabilidades claras documentadas y aceptadas.' },
  { codigo_control: 'A.5.10', descripcion: 'Establecer y comunicar políticas de uso aceptable que todos los usuarios deban firmar.' },
  { codigo_control: 'A.5.12', descripcion: 'Implementar un esquema de clasificación con niveles: público, interno, confidencial y secreto.' },
  { codigo_control: 'A.5.13', descripcion: 'Aplicar etiquetas de clasificación visibles en todos los documentos y activos de información.' },
  { codigo_control: 'A.5.14', descripcion: 'Establecer acuerdos formales de transferencia y usar canales cifrados para información sensible.' },
  { codigo_control: 'A.5.15', descripcion: 'Implementar control de acceso basado en roles con revisión periódica y aprobación formal.' },
  { codigo_control: 'A.5.16', descripcion: 'Gestionar el ciclo de vida completo de identidades con procesos formales de alta, modificación y baja.' },
  { codigo_control: 'A.5.17', descripcion: 'Establecer requisitos robustos de contraseñas e implementar autenticación multifactor.' },
  { codigo_control: 'A.5.37', descripcion: 'Documentar y mantener actualizados todos los procedimientos operativos críticos de seguridad.' },
  { codigo_control: 'A.6.1',  descripcion: 'Realizar verificación de antecedentes antes de contratar, proporcional al nivel de acceso.' },
  { codigo_control: 'A.6.2',  descripcion: 'Incluir cláusulas de seguridad de la información en todos los contratos laborales.' },
  { codigo_control: 'A.6.3',  descripcion: 'Implementar programa de concienciación periódico sobre seguridad, phishing e ingeniería social.' },
  { codigo_control: 'A.6.4',  descripcion: 'Establecer proceso disciplinario formal y transparente para incumplimientos de seguridad.' },
  { codigo_control: 'A.6.5',  descripcion: 'Implementar proceso de offboarding que revoque todos los accesos el día de cese.' },
  { codigo_control: 'A.6.6',  descripcion: 'Formalizar acuerdos de confidencialidad para todo el personal y terceros con acceso a información sensible.' },
  { codigo_control: 'A.6.7',  descripcion: 'Establecer política de trabajo remoto con controles técnicos (VPN, MFA) y organizativos específicos.' },
  { codigo_control: 'A.6.8',  descripcion: 'Crear canal de reporte de incidentes seguro y fomentar cultura de reporte sin represalias.' },
  { codigo_control: 'A.7.1',  descripcion: 'Definir y reforzar perímetros físicos con controles de acceso y señalización de áreas restringidas.' },
  { codigo_control: 'A.7.2',  descripcion: 'Implementar sistema de control de acceso físico con registro de entradas y salidas.' },
  { codigo_control: 'A.7.6',  descripcion: 'Establecer controles para el trabajo en áreas seguras incluyendo restricción de equipos de grabación.' },
  { codigo_control: 'A.7.7',  descripcion: 'Implementar y verificar periódicamente la política de escritorio despejado y pantalla limpia.' },
  { codigo_control: 'A.7.8',  descripcion: 'Instalar equipos en ubicaciones protegidas que minimicen el acceso no autorizado y riesgos físicos.' },
  { codigo_control: 'A.7.9',  descripcion: 'Establecer procedimientos de autorización y protección para activos que salen de las instalaciones.' },
  { codigo_control: 'A.7.10', descripcion: 'Implementar inventario y controles del ciclo de vida de soportes incluyendo transporte y baja.' },
  { codigo_control: 'A.7.14', descripcion: 'Establecer procedimientos de borrado seguro certificado o destrucción física de equipos en desuso.' },
  { codigo_control: 'A.8.2',  descripcion: 'Inventariar cuentas privilegiadas, monitorear su uso y aplicar el principio de mínimo privilegio.' },
  { codigo_control: 'A.8.3',  descripcion: 'Aplicar control de acceso granular basado en roles con revisiones anuales de permisos.' },
  { codigo_control: 'A.8.4',  descripcion: 'Controlar el acceso al código fuente con autenticación y registro de todos los cambios.' },
  { codigo_control: 'A.8.5',  descripcion: 'Implementar autenticación multifactor para todos los sistemas críticos y accesos remotos.' },
  { codigo_control: 'A.8.7',  descripcion: 'Desplegar solución antimalware actualizada y realizar simulaciones de phishing periódicas.' },
  { codigo_control: 'A.8.12', descripcion: 'Implementar solución DLP para detectar y prevenir la fuga de información por todos los canales.' },
  { codigo_control: 'A.8.13', descripcion: 'Establecer y verificar procedimientos de respaldo con copias en ubicaciones separadas.' },
  { codigo_control: 'A.8.15', descripcion: 'Centralizar y proteger los registros de actividad, revisando alertas de seguridad periódicamente.' },
  { codigo_control: 'A.8.20', descripcion: 'Segmentar la red, monitorear el tráfico y proteger el acceso remoto con VPN y autenticación fuerte.' },
  { codigo_control: 'A.8.24', descripcion: 'Implementar cifrado en tránsito y en reposo con gestión segura de claves criptográficas.' }
]

// Construir alternativas con puntaje (4 por control, 0.25 c/u = 1.0 total)
function buildAlternativas() {
  const result = []
  for (const ctrl of CONTROLES) {
    const textos = ALTERNATIVAS_TEXTO[ctrl.codigo_control] || []
    textos.forEach((texto, i) => {
      result.push({
        codigo_alternativa: `${ctrl.codigo_control}.${i + 1}`,
        codigo_control: ctrl.codigo_control,
        alternativas: texto,
        puntaje: 0.25,
        required: i === 0
      })
    })
  }
  return result
}

const ALTERNATIVAS = buildAlternativas()

// Construir estructura de categorías con controles y alternativas anidadas
function buildGeneralData() {
  return {
    categorias: CATEGORIAS.map(cat => ({
      codigo: cat.codigo,
      nombre: cat.nombre,
      controles: CONTROLES
        .filter(c => c.codigo_seccion === cat.codigo)
        .map(ctrl => ({
          codigo_control: ctrl.codigo_control,
          titulo: ctrl.titulo,
          alternativas: ALTERNATIVAS
            .filter(a => a.codigo_control === ctrl.codigo_control)
            .map(a => ({
              codigo_alternativa: a.codigo_alternativa,
              alternativas: a.alternativas,
              required: a.required,
              puntaje: a.puntaje
            }))
        }))
    })),
    propuestas: PROPUESTAS
  }
}

// Calcular puntajes a partir de alternativas marcadas
function calcularResultados(alternativasMarcadas) {
  const markedSet = new Set(alternativasMarcadas)
  const controlScores = {}

  for (const alt of ALTERNATIVAS) {
    const puntaje = markedSet.has(alt.codigo_alternativa) ? alt.puntaje : 0
    if (!controlScores[alt.codigo_control]) controlScores[alt.codigo_control] = 0
    controlScores[alt.codigo_control] += puntaje
  }

  const categoryScores = {}
  for (const [codigoControl, puntaje] of Object.entries(controlScores)) {
    const ctrl = CONTROLES.find(c => c.codigo_control === codigoControl)
    if (!ctrl) continue
    const cat = ctrl.codigo_seccion
    if (!categoryScores[cat]) categoryScores[cat] = { total: 0, count: 0, controles: [] }
    const p = Math.min(r2(puntaje), 1.0)
    categoryScores[cat].controles.push({ codigo_control: codigoControl, puntaje: p })
    categoryScores[cat].total += p
    categoryScores[cat].count += 1
  }

  const resultados = Object.entries(categoryScores).map(([cat, data]) => ({
    codigo_categoria: cat,
    puntaje: r2(data.total / data.count),
    controles: data.controles
  }))

  const puntaje_total = r2(resultados.reduce((s, r) => s + r.puntaje, 0) / resultados.length)

  return { resultados, puntaje_total }
}

function r2(n) {
  return Math.round(n * 100) / 100
}

module.exports = { USUARIOS, buildGeneralData, calcularResultados }
