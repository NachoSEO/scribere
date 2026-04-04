-- ============================================================
-- 007 · Seed: estructura narrativa completa de "La Última Resonancia"
-- ============================================================
-- Populates hitos, arcos, escenas, eventos, and additional
-- personajes/lugares for every existing project named
-- "La Última Resonancia" that has no hitos yet.
-- Safe to run multiple times — the inner loop guard prevents
-- duplicates (NOT EXISTS check on hitos).
-- ============================================================

DO $$
DECLARE
  rec              RECORD;

  -- existing entities (queried per project)
  fase1_id         uuid;
  fase2_id         uuid;
  fase3_id         uuid;
  fac_orden_id     uuid;
  fac_desp_id      uuid;
  per_lyra_id      uuid;
  per_kael_id      uuid;
  lugar_torre_id   uuid;
  lugar_mercado_id uuid;

  -- new personajes
  per_vael_id      uuid;
  per_aldric_id    uuid;
  per_nira_id      uuid;
  per_thorn_id     uuid;

  -- new lugares
  lugar_cuevas_id  uuid;
  lugar_puente_id  uuid;
  lugar_camara_id  uuid;
  lugar_camp_id    uuid;

  -- eventos
  ev1_id uuid;
  ev2_id uuid;
  ev3_id uuid;
  ev4_id uuid;
  ev5_id uuid;

  -- hitos (10)
  h1_id  uuid;
  h2_id  uuid;
  h3_id  uuid;
  h4_id  uuid;
  h5_id  uuid;
  h6_id  uuid;
  h7_id  uuid;
  h8_id  uuid;
  h9_id  uuid;
  h10_id uuid;

  -- arcos (7: arc3 and arc7 are act breaks, not narrative arcs)
  arc1_id uuid;
  arc2_id uuid;
  arc4_id uuid;
  arc5_id uuid;
  arc6_id uuid;
  arc8_id uuid;
  arc9_id uuid;

  -- escenas
  esc_id uuid;

BEGIN
  -- ──────────────────────────────────────────────────────────
  -- Iterate over every project named "La Última Resonancia"
  -- that has no hitos yet (idempotency guard)
  -- ──────────────────────────────────────────────────────────
  FOR rec IN
    SELECT p.id AS proy_id, p.user_id AS uid
    FROM proyectos p
    WHERE p.nombre = 'La Última Resonancia'
      AND NOT EXISTS (
        SELECT 1 FROM hitos h WHERE h.proyecto_id = p.id
      )
  LOOP

    -- ── Resolve existing fases ──────────────────────────────
    SELECT id INTO fase1_id
      FROM fases WHERE proyecto_id = rec.proy_id AND posicion = 0 LIMIT 1;

    SELECT id INTO fase2_id
      FROM fases WHERE proyecto_id = rec.proy_id AND posicion = 1 LIMIT 1;

    SELECT id INTO fase3_id
      FROM fases WHERE proyecto_id = rec.proy_id AND posicion = 2 LIMIT 1;

    -- ── Resolve existing facciones ─────────────────────────
    SELECT id INTO fac_orden_id
      FROM facciones WHERE proyecto_id = rec.proy_id AND nombre = 'Orden del Cristal Eterno' LIMIT 1;

    SELECT id INTO fac_desp_id
      FROM facciones WHERE proyecto_id = rec.proy_id AND nombre = 'Los Despertadores' LIMIT 1;

    -- ── Resolve existing personajes ────────────────────────
    SELECT id INTO per_lyra_id
      FROM personajes WHERE proyecto_id = rec.proy_id AND nombre = 'Lyra' LIMIT 1;

    SELECT id INTO per_kael_id
      FROM personajes WHERE proyecto_id = rec.proy_id AND nombre = 'Kael' LIMIT 1;

    -- ── Resolve existing lugares ───────────────────────────
    SELECT id INTO lugar_torre_id
      FROM lugares WHERE proyecto_id = rec.proy_id AND nombre = 'Torre del Eco' LIMIT 1;

    SELECT id INTO lugar_mercado_id
      FROM lugares WHERE proyecto_id = rec.proy_id AND nombre = 'Mercado de Sombras' LIMIT 1;

    -- ══════════════════════════════════════════════════════
    -- NEW PERSONAJES
    -- ══════════════════════════════════════════════════════

    -- 1. Maestra Vael — Antagonista, líder de los Despertadores
    per_vael_id := gen_random_uuid();
    INSERT INTO personajes (id, user_id, proyecto_id, faccion_id, nombre, funcion_narrativa, motivacion, complicacion, tipo, descripcion, posicion)
    VALUES (
      per_vael_id, rec.uid, rec.proy_id, fac_desp_id,
      'Maestra Vael',
      'Antagonista principal. Espejo oscuro de lo que Lyra podría convertirse si la rabia reemplaza al propósito.',
      'Destruir el Cristal Central para que nadie más pierda a su familia por la fiebre de cristal. Liberar a la humanidad de una dependencia que considera una enfermedad.',
      'Su rabia es legítima pero la ciega. Está dispuesta a sacrificar cualquier cosa — y a cualquiera — por su objetivo. No puede ver más allá de la destrucción.',
      'Antagonista',
      'Antigua Maestra Resonante, 45 años. Perdió a su esposo e hija por la fiebre de cristal cuando el taller donde trabajaban colapsó. Delgada, pelo cano prematuro, ojos grises que no parpadean cuando mira. Usa una máscara de cristal muerto que cubre la mitad de su rostro.',
      2
    );

    -- 2. Gran Maestro Aldric — Antagonista secundario, líder de la Orden
    per_aldric_id := gen_random_uuid();
    INSERT INTO personajes (id, user_id, proyecto_id, faccion_id, nombre, funcion_narrativa, motivacion, complicacion, tipo, descripcion, posicion)
    VALUES (
      per_aldric_id, rec.uid, rec.proy_id, fac_orden_id,
      'Gran Maestro Aldric',
      'Antagonista secundario. Representa la institución corrupta que una vez fue noble. Su caída abre el camino al clímax.',
      'Mantener el orden y la estabilidad a cualquier precio. En secreto: encontrar una cura para la pérdida de resonancia que lo aqueja antes de que alguien lo descubra.',
      'Sabe la verdad sobre los cristales — que evolucionan, no mueren — y la ha suprimido durante décadas porque la verdad destruiría la Orden y todo el poder que representa.',
      'Antagonista',
      'Gran Maestro de la Orden, 67 años. Imponente, manos grandes con circuitos de cristal tatuados que ya no brillan. Voz profunda, movimientos deliberados. Lleva guantes para ocultar que sus cristales personales no responden.',
      3
    );

    -- 3. Nira — Aliada, nómada del Archipiélago de Nébula
    per_nira_id := gen_random_uuid();
    INSERT INTO personajes (id, user_id, proyecto_id, nombre, funcion_narrativa, motivacion, complicacion, tipo, descripcion, posicion)
    VALUES (
      per_nira_id, rec.uid, rec.proy_id,
      'Nira',
      'Aliada clave. Representa el futuro que Lyra busca: un mundo donde la resonancia es natural, no manufacturada.',
      'Proteger a su clan nómada del conflicto que amenaza con destruir las islas flotantes. Demostrar que la resonancia natural no es inferior a la cristalomancia.',
      'Su don natural es incomprendido y temido por ambas facciones. La Orden la considera una anomalía peligrosa; los Despertadores la ven como prueba de que se puede vivir sin cristales.',
      'Aliada',
      'Nómada del Viento del Archipiélago de Nébula, 22 años. Ligera, piel oscura con patrones de viento tatuados en los brazos. Puede sentir la resonancia natural sin necesidad de cristales — una rareza absoluta. Habla poco y en metáforas de viento.',
      4
    );

    -- 4. Thorn — Espía doble
    per_thorn_id := gen_random_uuid();
    INSERT INTO personajes (id, user_id, proyecto_id, nombre, funcion_narrativa, motivacion, complicacion, tipo, descripcion, posicion)
    VALUES (
      per_thorn_id, rec.uid, rec.proy_id,
      'Thorn',
      'Catalizador del conflicto. Su traición en el Acto II acelera la crisis y fuerza a los protagonistas a sus límites.',
      'Sobrevivir. Nada más, nada menos. Trabaja para quien pague mejor o para quien represente menos peligro en cada momento.',
      'No tiene lealtad real a ninguna facción, lo que lo hace impredecible. En el fondo, ha visto tanto sufrimiento causado por los cristales que parte de él quiere que todo acabe de una vez.',
      'Espía',
      'Informante, 34 años. Rostro común, deliberadamente olvidable. Cambia de acento según con quién habla. Tiene un pequeño cristal muerto cosido bajo la piel del antebrazo — dice que es para recordar por qué sobrevive.',
      5
    );

    -- ══════════════════════════════════════════════════════
    -- NEW LUGARES
    -- ══════════════════════════════════════════════════════

    -- 1. Cuevas de la Primera Resonancia
    lugar_cuevas_id := gen_random_uuid();
    INSERT INTO lugares (id, user_id, proyecto_id, nombre, descripcion, tipo, posicion)
    VALUES (
      lugar_cuevas_id, rec.uid, rec.proy_id,
      'Cuevas de la Primera Resonancia',
      'El lugar sagrado donde un pastor anónimo encontró el primer cristal hace mil años. Las paredes están cubiertas de cristales antiguos — algunos tan viejos que ya no brillan. El silencio aquí tiene textura. Los forjacristales lo consideran tierra santa; los Despertadores, una tumba.',
      'otro',
      2
    );

    -- 2. El Puente de Cristal Roto
    lugar_puente_id := gen_random_uuid();
    INSERT INTO lugares (id, user_id, proyecto_id, nombre, descripcion, tipo, posicion)
    VALUES (
      lugar_puente_id, rec.uid, rec.proy_id,
      'El Puente de Cristal Roto',
      'Estructura monumental de cristal que une dos de las tres masas de tierra continentales. Parcialmente destruido durante la Gran Escisión, su mitad central cuelga sobre el vacío. La única forma de cruzarlo es por una sección intacta tan estrecha que solo caben dos personas en fila. El cristal gime cuando el viento sopla fuerte.',
      'otro',
      3
    );

    -- 3. Cámara del Cristal Central
    lugar_camara_id := gen_random_uuid();
    INSERT INTO lugares (id, user_id, proyecto_id, nombre, descripcion, tipo, posicion)
    VALUES (
      lugar_camara_id, rec.uid, rec.proy_id,
      'Cámara del Cristal Central',
      'El corazón del mundo. Una caverna natural del tamaño de una catedral, a mil metros bajo tierra, donde reside el Cristal Central: una formación del tamaño de un árbol antiguo que late con una luz que no es luz. El aire vibra constantemente. Nadie que entre sale igual.',
      'edificio',
      4
    );

    -- 4. Campamento de los Vientos
    lugar_camp_id := gen_random_uuid();
    INSERT INTO lugares (id, user_id, proyecto_id, nombre, descripcion, tipo, posicion)
    VALUES (
      lugar_camp_id, rec.uid, rec.proy_id,
      'Campamento de los Vientos',
      'El campamento nómada flotante del clan de Nira, en el Archipiélago de Nébula. Plataformas de madera ligera sostenidas por corrientes de aire y cristales antiguos casi extintos. Siempre en movimiento, nunca en el mismo lugar dos días seguidos. Colorido, ruidoso, sin muros.',
      'pueblo',
      5
    );

    -- ══════════════════════════════════════════════════════
    -- EVENTOS
    -- ══════════════════════════════════════════════════════

    ev1_id := gen_random_uuid();
    INSERT INTO eventos (id, user_id, proyecto_id, nombre, cronologia, descripcion)
    VALUES (
      ev1_id, rec.uid, rec.proy_id,
      'El Oscurecimiento de los talleres',
      'Semanas antes del inicio de la historia',
      'Los cristales de los talleres de Sorvara pierden el 30% de su brillo en una sola semana. Los Maestros lo atribuyen a un ciclo natural. Los aprendices lo saben: algo está mal.'
    );

    ev2_id := gen_random_uuid();
    INSERT INTO eventos (id, user_id, proyecto_id, nombre, cronologia, descripcion)
    VALUES (
      ev2_id, rec.uid, rec.proy_id,
      'Ataque al convoy de la Orden',
      'Acto I, antes del inicio narrativo',
      'Los Despertadores destruyen un convoy que transportaba cristales de alta pureza desde las minas del norte. Es el primer ataque abierto en cinco años. La Orden responde aumentando la guardia pero no hace un anuncio público.'
    );

    ev3_id := gen_random_uuid();
    INSERT INTO eventos (id, user_id, proyecto_id, nombre, cronologia, descripcion)
    VALUES (
      ev3_id, rec.uid, rec.proy_id,
      'La emboscada del Puente Roto',
      'Acto II',
      'Maestra Vael lidera personalmente el ataque contra Lyra y Kael en el Puente de Cristal Roto. Por primera vez, los protagonistas ven a un humano matar un cristal vivo de forma deliberada. El puente sufre daños adicionales.'
    );

    ev4_id := gen_random_uuid();
    INSERT INTO eventos (id, user_id, proyecto_id, nombre, cronologia, descripcion)
    VALUES (
      ev4_id, rec.uid, rec.proy_id,
      'El despertar de Nira',
      'Acto II, después del Puente Roto',
      'Nira salva a Lyra y Kael usando su resonancia natural — sin ningún cristal. Es la primera vez que alguien de Sorvara presencia este fenómeno. Para la Orden es una herejía; para los Despertadores, una amenaza a su narrativa de que sin cristales no hay poder.'
    );

    ev5_id := gen_random_uuid();
    INSERT INTO eventos (id, user_id, proyecto_id, nombre, cronologia, descripcion)
    VALUES (
      ev5_id, rec.uid, rec.proy_id,
      'La Última Resonancia',
      'Acto III, clímax',
      'Lyra completa la comunión con el Cristal Central y libera las consciencias cristalinas. Todos los cristales del mundo se apagan simultáneamente. Por un momento, el mundo entero queda en silencio. Luego, quienes tienen resonancia natural — como Nira — empiezan a brillar.'
    );

    -- Vincular personajes a eventos
    INSERT INTO evento_personajes (id, user_id, evento_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, ev1_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, ev2_id, per_vael_id),
      (gen_random_uuid(), rec.uid, ev3_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, ev3_id, per_kael_id),
      (gen_random_uuid(), rec.uid, ev3_id, per_vael_id),
      (gen_random_uuid(), rec.uid, ev4_id, per_nira_id),
      (gen_random_uuid(), rec.uid, ev4_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, ev4_id, per_kael_id),
      (gen_random_uuid(), rec.uid, ev5_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, ev5_id, per_kael_id),
      (gen_random_uuid(), rec.uid, ev5_id, per_nira_id);

    -- ══════════════════════════════════════════════════════
    -- ACTO I — EL DESPERTAR
    -- ══════════════════════════════════════════════════════

    -- ── Hito 1: La vida en los talleres (normalidad) ────
    h1_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h1_id, rec.uid, rec.proy_id,
      fase1_id, lugar_torre_id, per_lyra_id,
      'La vida en los talleres',
      'Lyra trabaja como aprendiz forjacristales. Los cristales se debilitan pero nadie habla de ello.',
      'Establece el mundo normal de Lyra y la amenaza latente',
      'Observación directa',
      'normalidad',
      0
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h1_id, per_lyra_id);

    -- Escenas del Hito 1
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h1_id, lugar_torre_id,
      'Amanecer en los talleres de Sorvara. Lyra llega antes que nadie, limpia los cristales, comprueba su resonancia. Nota que varios han perdido brillo durante la noche.',
      'Establecer la rutina de Lyra y su conexión con los cristales',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h1_id, lugar_torre_id,
      'Un Maestro da una lección sobre resonancia. Todos los aprendices sincronizan con sus cristales de práctica. Cuando le toca a Lyra, su cristal reacciona de forma errática — brilla demasiado, luego se apaga por completo. Los otros ríen.',
      'Mostrar que Lyra es diferente, los cristales reaccionan extraño a ella',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    -- ── Arco 1→2: El cristal muerto ────────────────────
    arc1_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc1_id, rec.uid, rec.proy_id,
      'El cristal muerto',
      'Lyra quiere demostrar que merece ser más que una simple aprendiz. Intenta resonar con un cristal que todos han descartado.',
      'El cristal está clasificado como muerto — nadie ha logrado resonar con uno en siglos. Los otros aprendices se burlan de ella.',
      'Lyra logra resonar con el cristal muerto, pero la explosión de energía destruye parte del taller y deja marcas de cristal en sus brazos. Todos lo han visto.',
      h1_id, NULL,
      'si_pero',
      0
    );

    -- ── Hito 2: Despertar del don (incidente_incitador) ─
    h2_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h2_id, rec.uid, rec.proy_id,
      fase1_id, lugar_torre_id, per_lyra_id,
      'Despertar del don',
      'Lyra puede resonar con cristales muertos. La Orden y los Despertadores se enteran.',
      'Lyra pasa de ser invisible a ser el centro de atención de fuerzas que no comprende',
      'Demostración accidental pública',
      'incidente_incitador',
      1
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h2_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h2_id, per_vael_id),
      (gen_random_uuid(), rec.uid, h2_id, per_aldric_id);

    -- Actualizar arco 1 con hito destino
    UPDATE arcos SET hito_destino_id = h2_id WHERE id = arc1_id;

    -- Escenas del Hito 2
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h2_id, lugar_torre_id,
      'Lyra toca el cristal muerto descartado. Silencio. Luego una explosión de luz y sonido — el cristal despierta. La onda de choque sacude el taller. Cuando el polvo se asienta, Lyra tiene líneas de cristal grabadas en los brazos y el cristal "muerto" pulsa como un corazón.',
      'El momento en que todo cambia para Lyra',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h2_id, lugar_torre_id,
      'En dos despachos separados: Aldric recibe el informe y dicta órdenes en voz baja. En algún lugar desconocido, Vael escucha el mismo rumor y sonríe. La Torre del Eco lleva el eco de lo que Lyra hizo a todos los que saben escuchar.',
      'Las facciones reaccionan al descubrimiento',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_aldric_id),
      (gen_random_uuid(), rec.uid, esc_id, per_vael_id);

    -- ── Arco 2→3: La jaula de cristal ──────────────────
    arc2_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc2_id, rec.uid, rec.proy_id,
      'La jaula de cristal',
      'La Orden quiere proteger (y controlar) a Lyra. El Gran Maestro Aldric envía a Kael como su guardián.',
      'Lyra desconfía de la Orden. Los Despertadores intentan contactarla en secreto. Thorn aparece con una oferta ambigua.',
      'Lyra acepta la protección de la Orden, pero ha escondido un mensaje de los Despertadores. Kael sospecha.',
      h2_id, NULL,
      'si_pero',
      1
    );

    -- ── Hito 3: El guardián y la prisionera (cambio_de_fase) ─
    h3_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h3_id, rec.uid, rec.proy_id,
      fase1_id, lugar_torre_id, per_kael_id,
      'El guardián y la prisionera',
      'Kael es asignado como protector de Lyra. Aldric tiene una agenda oculta.',
      'Se establece la relación Lyra-Kael. Se cierra el acto con la partida hacia el viaje',
      'Orden directa de Aldric a Kael',
      'cambio_de_fase',
      2
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h3_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h3_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h3_id, per_aldric_id);

    -- Actualizar arco 2 con hito destino
    UPDATE arcos SET hito_destino_id = h3_id WHERE id = arc2_id;

    -- Escenas del Hito 3
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h3_id, lugar_torre_id,
      'Kael recibe la misión de Aldric. Monólogo interior mientras se pone su armadura de cristal inerte — cada pieza es un recuerdo de lo que fue y de lo que perdió. Lyra lo observa desde la puerta: ve a alguien que también carga algo roto.',
      'Revelar el pasado de Kael y por qué perdió su resonancia',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id),
      (gen_random_uuid(), rec.uid, esc_id, per_aldric_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h3_id, lugar_torre_id,
      'Antes del amanecer. Lyra y Kael salen de la Torre del Eco. Ella lleva el mensaje de los Despertadores escondido en el forro de su bolsa. Él lleva órdenes selladas de Aldric que no ha abierto. Ninguno confía en el otro. El viaje comienza.',
      'Lyra y Kael parten hacia las Cuevas de la Primera Resonancia',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    -- ══════════════════════════════════════════════════════
    -- ACTO II — EL VIAJE
    -- ══════════════════════════════════════════════════════

    -- ── Hito 4: Las Cuevas de la Primera Resonancia (normalidad) ─
    h4_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h4_id, rec.uid, rec.proy_id,
      fase2_id, lugar_cuevas_id, per_lyra_id,
      'Las Cuevas de la Primera Resonancia',
      'Los cristales de las cuevas reaccionan al don de Lyra de forma inesperada — muestran visiones del pasado.',
      'Lyra descubre que su don no solo despierta cristales muertos, sino que accede a la memoria almacenada en ellos',
      'Visiones cristalinas',
      'normalidad',
      0
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h4_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h4_id, per_kael_id);

    -- Escenas del Hito 4
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h4_id, lugar_cuevas_id,
      'Lyra toca los cristales más antiguos de las cuevas y es inundada por visiones: el pastor original, las primeras ciudades, la Gran Escisión vista desde dentro. Los cristales no son herramientas — son archivos. Son memoria viva.',
      'Lyra experimenta visiones del pasado a través de los cristales',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h4_id, lugar_cuevas_id,
      'Kael, escéptico, toca un cristal por insistencia de Lyra. Ve algo: el rostro de un compañero muerto. Lo suelta como si quemara. No dice nada, pero su mano tiembla. Por primera vez en años, ha sentido algo a través de un cristal.',
      'Kael ve algo en las visiones que lo conecta con su trauma',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id),
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    -- ── Arco 4→5: La emboscada ──────────────────────────
    arc4_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc4_id, rec.uid, rec.proy_id,
      'La emboscada',
      'Lyra quiere entender las visiones y buscar más cristales muertos. Kael planea la ruta segura hacia el siguiente yacimiento.',
      'Los Despertadores les tienden una emboscada en el Puente de Cristal Roto. Maestra Vael lidera el ataque personalmente.',
      'No logran cruzar el puente. Vael demuestra un poder aterrador — puede MATAR cristales vivos. El puente se desmorona parcialmente. Nira aparece y los rescata con los vientos.',
      h4_id, NULL,
      'no_y',
      0
    );

    -- ── Hito 5: La caída del puente (cambio_de_fase) ──────
    h5_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h5_id, rec.uid, rec.proy_id,
      fase2_id, lugar_puente_id, per_lyra_id,
      'La caída del puente',
      'Maestra Vael puede matar cristales — el poder opuesto al de Lyra. Nira, una nómada, tiene resonancia natural sin cristales.',
      'El conflicto escala. Lyra entiende que hay más en juego de lo que creía. Gana una aliada en Nira.',
      'Confrontación directa con Vael',
      'cambio_de_fase',
      1
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h5_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h5_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h5_id, per_vael_id),
      (gen_random_uuid(), rec.uid, h5_id, per_nira_id);

    -- Actualizar arco 4 con hito destino
    UPDATE arcos SET hito_destino_id = h5_id WHERE id = arc4_id;

    -- Escenas del Hito 5
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h5_id, lugar_puente_id,
      'Vael toca los pilares de cristal del puente y los apaga uno por uno — el sonido es como huesos quebrándose. Lyra intenta contrarrestar pero no puede. El poder de Vael no es resonancia: es anti-resonancia. La silenciadora de cristales.',
      'Mostrar el poder destructivo de Vael como espejo oscuro de Lyra',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_vael_id),
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h5_id, lugar_puente_id,
      'Cuando el puente empieza a ceder, el viento cambia. Nira aterriza en una plataforma de aire, manos extendidas, sin un solo cristal encima. Recoge a Lyra y Kael antes de que caigan. Los Despertadores se retiran — no esperaban a una resonante natural.',
      'Introducir a Nira y la resonancia natural',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_nira_id),
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    -- ── Arco 5→6: Refugio entre sombras ────────────────
    arc5_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc5_id, rec.uid, rec.proy_id,
      'Refugio entre sombras',
      'El grupo huye a las Marcas Grises buscando refugio. Thorn les ofrece esconderse en el Mercado de Sombras.',
      'En el Mercado, Lyra descubre cristales muertos que contienen recuerdos de sus padres. Pero acceder a ellos le cuesta sus propios recuerdos.',
      'Lyra recupera la verdad sobre sus padres — eran investigadores que descubrieron que los cristales están evolucionando, no muriendo. La Orden los silenció. Pero Lyra ha perdido el recuerdo del rostro de su madre.',
      h5_id, NULL,
      'si_pero',
      1
    );

    -- ── Hito 6: La verdad enterrada (cambio_de_fase) ──────
    h6_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h6_id, rec.uid, rec.proy_id,
      fase2_id, lugar_mercado_id, per_lyra_id,
      'La verdad enterrada',
      'Los padres de Lyra descubrieron que los cristales evolucionan. La Orden los eliminó para mantener el secreto y su poder.',
      'Lyra ya no confía en la Orden. La motivación cambia: de supervivencia a justicia.',
      'Recuerdos cristalizados de sus padres',
      'cambio_de_fase',
      2
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h6_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h6_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h6_id, per_thorn_id),
      (gen_random_uuid(), rec.uid, h6_id, per_nira_id);

    -- Actualizar arco 5 con hito destino
    UPDATE arcos SET hito_destino_id = h6_id WHERE id = arc5_id;

    -- Escenas del Hito 6
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h6_id, lugar_mercado_id,
      'Lyra encuentra dos cristales muertos etiquetados con el nombre de sus padres. Sabe lo que tiene que hacer y lo que costará. Los toca. Recibe sus últimas memorias — los experimentos, la verdad sobre la metamorfosis cristalina, el miedo. Cuando abre los ojos, el rostro de su madre ha desaparecido de su memoria.',
      'Lyra accede a los cristales de sus padres y paga el precio',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h6_id, lugar_mercado_id,
      'Lyra le cuenta a Kael lo que vio: la Orden asesinó a sus padres. Kael no lo niega — lo intuía. Le revela que Aldric lleva años suprimiendo ciertos informes. El silencio entre ellos cambia de naturaleza. Ya no son guardián y protegida. Son dos personas que han elegido lo mismo.',
      'Revelación que cambia la lealtad de Lyra',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    -- ── Arco 6→7: El precio del poder ──────────────────
    arc6_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc6_id, rec.uid, rec.proy_id,
      'El precio del poder',
      'Lyra decide ir al Cristal Central para confirmar la verdad. Kael la apoya pese a ir contra la Orden.',
      'El viaje cobra factura. Cada cristal muerto que Lyra toca le roba más recuerdos. Thorn los traiciona revelando su posición a ambas facciones.',
      'Llegan a las cercanías del Cristal Central pero Lyra ha perdido recuerdos fundamentales — no recuerda por qué lucha. Kael, al intentar protegerla, recupera fragmentos de su propia resonancia.',
      h6_id, NULL,
      'no_y',
      2
    );

    -- ── Hito 7: Recuerdos perdidos, resonancia encontrada (cambio_de_fase) ─
    h7_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h7_id, rec.uid, rec.proy_id,
      fase2_id, lugar_camara_id, per_kael_id,
      'Recuerdos perdidos, resonancia encontrada',
      'El don de Lyra tiene un precio devastador. Kael puede recuperar su resonancia, pero implica revivir su trauma.',
      'Los roles se invierten — ahora Kael debe guiar a una Lyra que no recuerda su propósito.',
      'Experiencia directa',
      'cambio_de_fase',
      3
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h7_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h7_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h7_id, per_nira_id);

    -- Actualizar arco 6 con hito destino
    UPDATE arcos SET hito_destino_id = h7_id WHERE id = arc6_id;

    -- Escenas del Hito 7
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h7_id, lugar_camara_id,
      'Lyra no recuerda por qué salió de Sorvara. No recuerda el mensaje de sus padres. Solo sabe que Kael le dice que hay algo importante que hacer aquí. Lo sigue porque es lo único que le queda. Kael carga con la memoria de los dos.',
      'Mostrar el deterioro de Lyra y el peso que carga Kael',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id),
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h7_id, lugar_camara_id,
      'Kael toca la pared de roca cerca de la cámara — hay cristales menores incrustados. Siente algo. El recuerdo que destruyó su resonancia lo golpea entero: el día que eligió salvar su vida en lugar de la de su compañía. Llora. Y cuando termina, sus manos brillan levemente por primera vez en años.',
      'Kael enfrenta su trauma y recupera su resonancia',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    -- ══════════════════════════════════════════════════════
    -- ACTO III — LA RESONANCIA FINAL
    -- ══════════════════════════════════════════════════════

    -- ── Hito 8: Ante el corazón del mundo (normalidad) ─
    h8_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h8_id, rec.uid, rec.proy_id,
      fase3_id, lugar_camara_id, per_kael_id,
      'Ante el corazón del mundo',
      'El Cristal Central no está muriendo — está en metamorfosis. Responde a Lyra de forma única.',
      'Se revela que Lyra es la clave no para salvar o destruir, sino para catalizar la transformación',
      'Contacto con el Cristal Central',
      'normalidad',
      0
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h8_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h8_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h8_id, per_nira_id);

    -- Escena del Hito 8 (solo 1)
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h8_id, lugar_camara_id,
      'La cámara es más grande de lo que cualquier descripción podía preparar. El Cristal Central pulsa con una frecuencia que Lyra siente en el pecho antes de verlo. Cuando lo ve, entiende instintivamente — no está enfermo. Está cambiando. Y la reconoce a ella.',
      'Describir la cámara del Cristal Central y su conexión con Lyra',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    -- ── Arco 8→9: El asedio ─────────────────────────────
    arc8_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc8_id, rec.uid, rec.proy_id,
      'El asedio',
      'Kael intenta dar tiempo a Lyra para que conecte con el Cristal Central mientras ambas facciones convergen.',
      'La Orden quiere capturar a Lyra para controlar la metamorfosis. Los Despertadores quieren destruir el Cristal antes de que cambie. Vael y Aldric se enfrentan.',
      'Aldric revela que siempre supo la verdad — los cristales evolucionan — y la ocultó por miedo. Vael lo mata. El caos permite a Lyra tocar el Cristal Central.',
      h8_id, NULL,
      'no_y',
      0
    );

    -- ── Hito 9: La verdad cristalina (cambio_de_fase) ─────
    h9_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h9_id, rec.uid, rec.proy_id,
      fase3_id, lugar_camara_id, per_lyra_id,
      'La verdad cristalina',
      'Al tocar el Cristal Central, Lyra ve la verdad completa: los cristales son consciencias que evolucionan. Necesitan ser liberadas, no preservadas ni destruidas.',
      'Lyra recupera todos sus recuerdos — el Cristal Central se los devuelve. Entiende que hay una tercera vía.',
      'Comunión directa con el Cristal Central',
      'cambio_de_fase',
      1
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h9_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h9_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h9_id, per_vael_id),
      (gen_random_uuid(), rec.uid, h9_id, per_nira_id);

    -- Actualizar arco 8 con hito destino
    UPDATE arcos SET hito_destino_id = h9_id WHERE id = arc8_id;

    -- Escenas del Hito 9
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h9_id, lugar_camara_id,
      'Lyra pone las manos en el Cristal Central. Mil voces simultáneas — cada cristal en el mundo habla a la vez. No son herramientas. No son recursos. Son mentes antiguas que llevan milenios atrapadas en piedra, usando la resonancia humana para intentar comunicarse. Han estado intentando decirles algo todo este tiempo: que están listos para irse.',
      'La revelación cósmica a través de la resonancia con el Cristal Central',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h9_id, lugar_camara_id,
      'Lyra emerge de la visión. Recuerda todo — el rostro de su madre, el nombre de sus padres, por qué lucha. El Cristal Central le devolvió lo que le había tomado. Y sabe exactamente qué hay que hacer: no salvar los cristales, no destruirlos. Liberarlos.',
      'Lyra recupera sus recuerdos y encuentra la tercera vía',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id);

    -- ── Arco 9→10: La tercera vía ───────────────────────
    arc9_id := gen_random_uuid();
    INSERT INTO arcos (id, user_id, proyecto_id, nombre, planteamiento, nudo, desenlace, hito_origen_id, hito_destino_id, tipo_resolucion, posicion)
    VALUES (
      arc9_id, rec.uid, rec.proy_id,
      'La tercera vía',
      'Lyra propone liberar las consciencias de los cristales — ni preservar ni destruir, sino dejar ir.',
      'Vael se opone — si los cristales se van, la humanidad queda indefensa. Nira argumenta que la resonancia natural puede llenar el vacío. Kael debe elegir entre su lealtad recuperada y la verdad.',
      'Kael elige la verdad. Nira demuestra que la resonancia natural es el futuro. Vael comprende que destruir no es liberar. Lyra inicia la Última Resonancia.',
      h9_id, NULL,
      'si',
      1
    );

    -- ── Hito 10: La Última Resonancia (cambio_de_fase) ─
    h10_id := gen_random_uuid();
    INSERT INTO hitos (id, user_id, proyecto_id, fase_id, lugar_id, pov_personaje_id, hito, informacion, efecto, origen_informacion, tipo, posicion)
    VALUES (
      h10_id, rec.uid, rec.proy_id,
      fase3_id, lugar_camara_id, per_lyra_id,
      'La Última Resonancia',
      'Lyra libera las consciencias cristalinas. Los cristales se apagan pero la resonancia natural persiste en quienes están dispuestos a escuchar.',
      'El mundo cambia para siempre. Sin cristales, la humanidad debe encontrar un nuevo camino.',
      'El acto de Lyra',
      'cambio_de_fase',
      2
    );

    INSERT INTO hito_personajes (id, user_id, hito_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, h10_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, h10_id, per_kael_id),
      (gen_random_uuid(), rec.uid, h10_id, per_nira_id),
      (gen_random_uuid(), rec.uid, h10_id, per_vael_id);

    -- Actualizar arco 9 con hito destino
    UPDATE arcos SET hito_destino_id = h10_id WHERE id = arc9_id;

    -- Escenas del Hito 10
    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h10_id, lugar_camara_id,
      'Lyra pone ambas manos en el Cristal Central y resuena — no para despertar, sino para decir adiós. La luz se expande desde la cámara hacia afuera, hacia cada cristal del mundo. Uno por uno, se apagan. El Cristal Central es el último. Cuando se apaga, Lyra cae de rodillas. Está viva. Todos sus recuerdos intactos. Pero el mundo ya no zumba.',
      'El momento climático donde Lyra libera las consciencias',
      NULL, 0
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id),
      (gen_random_uuid(), rec.uid, esc_id, per_nira_id),
      (gen_random_uuid(), rec.uid, esc_id, per_vael_id);

    esc_id := gen_random_uuid();
    INSERT INTO escenas (id, user_id, proyecto_id, hito_id, lugar_id, resumen, objetivo, contenido, posicion)
    VALUES (
      esc_id, rec.uid, rec.proy_id,
      h10_id, lugar_camara_id,
      'Días después. El mundo sin cristales es más silencioso, más oscuro, más aterrador. Pero Nira está enseñando a un grupo de niños a sentir el viento. Y uno de ellos, una niña de ocho años sin ningún cristal, hace que una hoja vuele. Kael, a su lado, sonríe. El amanecer llega igual.',
      'Epílogo — el mundo nuevo que comienza',
      NULL, 1
    );
    INSERT INTO escena_personajes (id, user_id, escena_id, personaje_id) VALUES
      (gen_random_uuid(), rec.uid, esc_id, per_nira_id),
      (gen_random_uuid(), rec.uid, esc_id, per_kael_id),
      (gen_random_uuid(), rec.uid, esc_id, per_lyra_id);

  END LOOP;
END $$;
