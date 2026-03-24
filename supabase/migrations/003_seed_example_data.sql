-- ============================================================
-- 003 · Seed example data for every new user
-- ============================================================
-- A trigger on auth.users INSERT calls this function to populate
-- a complete example mundo + proyecto so new users see data.
-- ============================================================

create or replace function seed_example_data(uid uuid)
returns void as $$
declare
  mundo_id   uuid;
  era1_id    uuid;
  era2_id    uuid;
  era3_id    uuid;
  reg_cont   uuid;
  reg_sor    uuid;
  reg_marc   uuid;
  reg_neb    uuid;
  proy_id    uuid;
  fac_orden  uuid;
  fac_desp   uuid;
  per_kael   uuid;
  per_lyra   uuid;
  fase1_id   uuid;
  fase2_id   uuid;
  fase3_id   uuid;
  lugar1_id  uuid;
  lugar2_id  uuid;
begin
  -- ── MUNDO ──────────────────────────────────────────────────
  insert into mundos (id, user_id, nombre, descripcion)
  values (gen_random_uuid(), uid,
    'Las Tierras de Aldara',
    'Un continente fracturado por la Gran Escisión, donde la magia fluye a través de cristales vivos y las naciones luchan por controlar sus fuentes de poder.')
  returning id into mundo_id;

  -- ── ERAS + EVENTOS ─────────────────────────────────────────
  insert into cronologia_eras (id, user_id, mundo_id, nombre, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id,
    'La Era del Silencio',
    'Un periodo primitivo antes del despertar de los cristales. La humanidad vivía en clanes aislados, sin conocer el poder latente bajo la tierra.',
    0)
  returning id into era1_id;

  insert into cronologia_eventos (user_id, era_id, nombre, descripcion, posicion) values
    (uid, era1_id, 'Descubrimiento del Primer Cristal', 'Un pastor encuentra una piedra luminosa en las cuevas de Sorvara. Al tocarla, las paredes de la cueva cobran vida.', 0),
    (uid, era1_id, 'Fundación de las ciudades primitivas', 'Los clanes se asientan alrededor de los yacimientos de cristales, formando las primeras urbes.', 1);

  insert into cronologia_eras (id, user_id, mundo_id, nombre, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id,
    'La Era de los Cristales',
    'Apogeo de la civilización. Los Forjacristales dominan el arte de la resonancia y las naciones prosperan. Pero la codicia desata la catástrofe.',
    1)
  returning id into era2_id;

  insert into cronologia_eventos (user_id, era_id, nombre, descripcion, posicion) values
    (uid, era2_id, 'La Gran Escisión', 'Un ritual fallido fractura el continente en tres masas de tierra. Los cristales se desestabilizan y regiones enteras quedan sumidas en caos.', 0),
    (uid, era2_id, 'Guerra de los Tres Reinos', 'Los tres reinos supervivientes luchan por controlar el Cristal Central, la última fuente estable de poder.', 1);

  insert into cronologia_eras (id, user_id, mundo_id, nombre, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id,
    'La Era del Crepúsculo',
    'El presente. Los cristales se apagan lentamente y nadie sabe por qué. La magia se debilita y el mundo se encamina hacia la oscuridad.',
    2)
  returning id into era3_id;

  insert into cronologia_eventos (user_id, era_id, nombre, descripcion, posicion) values
    (uid, era3_id, 'El Oscurecimiento', 'El Cristal Central emite un pulso de sombra. En una sola noche, todos los cristales menores pierden la mitad de su brillo.', 0);

  -- ── REGIONES (jerárquicas) ─────────────────────────────────
  insert into regiones (id, user_id, mundo_id, nombre, tipo, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id,
    'Aldara', 'Continente',
    'El continente principal, ahora dividido en tres masas de tierra conectadas por puentes de cristal inestables.',
    0)
  returning id into reg_cont;

  insert into regiones (id, user_id, mundo_id, region_padre_id, nombre, tipo, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id, reg_cont,
    'Reino de Sorvara', 'País',
    'El reino más antiguo, construido sobre el mayor yacimiento de cristales. Su capital, Sorvara, es una ciudad de torres luminosas.',
    1)
  returning id into reg_sor;

  insert into regiones (id, user_id, mundo_id, region_padre_id, nombre, tipo, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id, reg_cont,
    'Las Marcas Grises', 'País',
    'Tierras devastadas por la Gran Escisión. Un páramo de cristales muertos donde sobreviven los más duros.',
    2)
  returning id into reg_marc;

  insert into regiones (id, user_id, mundo_id, region_padre_id, nombre, tipo, descripcion, posicion)
  values (gen_random_uuid(), uid, mundo_id, reg_cont,
    'Archipiélago de Nébula', 'Islas',
    'Un grupo de islas flotantes sostenidas por cristales antiguo. Hogar de los Nómadas del Viento.',
    3)
  returning id into reg_neb;

  -- ── CULTURAS ───────────────────────────────────────────────
  insert into culturas (user_id, mundo_id, nombre, descripcion, costumbres, lengua, organizacion, posicion) values
    (uid, mundo_id,
     'Los Forjacristales',
     'Artesanos ancestrales que dominan el arte de moldear cristales vivos. Son la élite cultural de Sorvara.',
     'Ceremonia de la Primera Resonancia al cumplir 16 años. Ayuno de tres días antes de forjar. Los maestros se tatúan circuitos de cristal en las manos.',
     'Cristalino — un idioma tonal donde el significado cambia según la vibración de la voz',
     'Gremio jerárquico con tres rangos: Aprendiz, Artífice y Maestro Resonante. El Consejo de Maestros gobierna Sorvara.',
     0),
    (uid, mundo_id,
     'Los Nómadas del Viento',
     'Pueblo errante que navega entre las islas flotantes de Nébula. Rechazan la forja de cristales y usan su resonancia natural.',
     'Nunca tocan tierra firme por más de una luna. Los nacimientos ocurren en el aire, sobre plataformas de viento. Sus muertos son lanzados al vacío.',
     'Sílaba — un lenguaje silbado que viaja con el viento entre islas',
     'Clanes familiares liderados por la Voz Mayor, la persona con la resonancia natural más fuerte.',
     1);

  -- ── SISTEMAS ───────────────────────────────────────────────
  insert into sistemas (user_id, mundo_id, nombre, tipo, descripcion, reglas, limitaciones, posicion) values
    (uid, mundo_id,
     'Cristalomancia',
     'Magia',
     'Sistema de magia basado en la resonancia con cristales vivos. Los usuarios sincronizan su frecuencia vital con la del cristal para manipular energía.',
     'Todo cristal tiene una frecuencia única. El usuario debe entrar en resonancia (sincronizar su pulso cardíaco) para activarlo. Cristales más grandes permiten efectos más potentes. La resonancia requiere contacto físico.',
     'Usar un cristal agotado causa fiebre de cristal (fiebre, alucinaciones, pérdida de memoria). La resonancia prolongada fusiona el cristal con la piel del usuario. Nadie puede resonar con más de tres cristales simultáneamente.',
     0),
    (uid, mundo_id,
     'Pactos de Sangre',
     'Político',
     'Sistema de alianzas y juramentos sellados mediante rituales con cristales. Un pacto roto tiene consecuencias físicas reales.',
     'Ambas partes deben tocar el mismo cristal mientras recitan el juramento. El cristal registra el pacto y brilla mientras se cumple. Los pactos pueden ser entre personas, familias o naciones.',
     'Un pacto roto causa dolor físico proporcional a la importancia del juramento. Los pactos no pueden revocarse, solo cumplirse o romperse. El cristal del pacto se oscurece si una parte actúa de mala fe.',
     1);

  -- ── PROYECTO ───────────────────────────────────────────────
  insert into proyectos (id, user_id, nombre, descripcion, mundo_id)
  values (gen_random_uuid(), uid,
    'La Última Resonancia',
    'Una joven forjacristales descubre que puede resonar con los cristales muertos, lo que la convierte en la clave para salvar — o destruir — el mundo.',
    mundo_id)
  returning id into proy_id;

  -- General
  insert into general (user_id, proyecto_id, premisa, conflicto, idea_controladora, contraideas, temas, tono, estilo, estructura, resumen)
  values (uid, proy_id,
    'El poder no reside en controlar la energía, sino en saber cuándo dejarla ir.',
    'Lyra debe elegir entre usar su don para restaurar los cristales (salvando la civilización pero perpetuando su dependencia) o dejarlos morir (forzando a la humanidad a evolucionar pero causando una catástrofe inmediata).',
    'El verdadero progreso requiere soltar aquello que nos define, aunque el precio sea la pérdida de identidad.',
    'Preservar la tradición es necesario para mantener la estabilidad. Sin raíces, la humanidad se pierde.',
    'Dependencia vs. autonomía, tradición vs. cambio, sacrificio personal, la naturaleza del poder',
    'Épico con notas intimistas. Tensión creciente con momentos de calma contemplativa.',
    'Narración en tercera persona limitada, alternando POV entre Lyra y Kael. Prosa lírica en las escenas de resonancia.',
    'Tres actos clásicos. Acto I: descubrimiento del don. Acto II: viaje y confrontación. Acto III: elección final.',
    'Lyra, una joven forjacristales huérfana, descubre que puede resonar con cristales muertos — algo que se creía imposible. La Orden del Cristal Eterno quiere usarla como arma. Los Despertadores quieren que destruya el Cristal Central. Kael, un ex-soldado que perdió su resonancia, la protege mientras ella busca una tercera vía.');

  -- ── FACCIONES ──────────────────────────────────────────────
  insert into facciones (id, user_id, proyecto_id, nombre, concepto, objetivos, motivacion, complicacion, posicion)
  values (gen_random_uuid(), uid, proy_id,
    'Orden del Cristal Eterno',
    'Organización conservadora de Maestros Resonantes que gobierna Sorvara y controla el acceso a los cristales.',
    'Restaurar el brillo de los cristales y mantener el orden establecido. Preservar la cristalomancia como pilar de la civilización.',
    'Miedo genuino al caos que traería el fin de los cristales. Muchos miembros han dedicado su vida a la resonancia.',
    'Están dispuestos a sacrificar individuos por el bien colectivo. Su líder oculta que él mismo está perdiendo la resonancia.',
    0)
  returning id into fac_orden;

  insert into facciones (id, user_id, proyecto_id, nombre, concepto, objetivos, motivacion, complicacion, posicion)
  values (gen_random_uuid(), uid, proy_id,
    'Los Despertadores',
    'Movimiento clandestino que cree que los cristales son una prisión para la humanidad y deben ser destruidos.',
    'Destruir el Cristal Central para liberar a la humanidad de su dependencia. Forzar una evolución hacia un mundo sin magia.',
    'Testigos de primera mano del sufrimiento causado por la fiebre de cristal y la explotación de los yacimientos.',
    'Su líder es una antigua Maestra Resonante que perdió a su familia por la fiebre de cristal, pero su rabia nubla su juicio.',
    1)
  returning id into fac_desp;

  -- Relación entre facciones
  perform (
    select id from faccion_relaciones where false -- just to reference the table
  );
  insert into faccion_relaciones (user_id, faccion_a_id, faccion_b_id, descripcion)
  values (uid,
    least(fac_orden, fac_desp),
    greatest(fac_orden, fac_desp),
    'Enemigos ideológicos. La Orden considera a los Despertadores terroristas. Los Despertadores ven a la Orden como tiranos que perpetúan la adicción a los cristales.');

  -- ── PERSONAJES ─────────────────────────────────────────────
  insert into personajes (id, user_id, proyecto_id, nombre, funcion_narrativa, motivacion, complicacion, tipo, descripcion, posicion)
  values (gen_random_uuid(), uid, proy_id,
    'Lyra',
    'Protagonista. Su don único la coloca en el centro del conflicto.',
    'Encontrar su lugar en un mundo que la ve como herramienta. Honrar la memoria de sus padres, que murieron en las minas de cristal.',
    'Cada vez que usa su don, los cristales muertos absorben parte de sus recuerdos. Cuanto más poder usa, más se pierde a sí misma.',
    'Protagonista',
    'Joven de 19 años, huérfana, aprendiz de forja en los talleres de Sorvara. Callada pero observadora. Tiene cicatrices de cristal en las palmas de las manos desde que tocó su primer cristal muerto.',
    0)
  returning id into per_kael;

  insert into personajes (id, user_id, proyecto_id, nombre, funcion_narrativa, motivacion, complicacion, tipo, descripcion, faccion_id, posicion)
  values (gen_random_uuid(), uid, proy_id,
    'Kael',
    'Deuteragonista y protector. Ofrece perspectiva sobre qué significa perder la resonancia.',
    'Redimirse por un error pasado que costó la vida de su compañía. Proteger a Lyra no por deber, sino porque ve en ella la oportunidad de que alguien haga lo correcto.',
    'Perdió su resonancia tras un trauma. Si la recupera, deberá enfrentarse al recuerdo que la destruyó.',
    'Deuteragonista',
    'Ex-soldado de la Orden, 28 años. Corpulento, pelo rapado, lleva una armadura de cristal inerte como recordatorio. Sarcástico por fuera, atormentado por dentro.',
    fac_orden,
    1)
  returning id into per_lyra;

  -- Relación entre personajes
  insert into personaje_relaciones (user_id, personaje_a_id, personaje_b_id, descripcion)
  values (uid,
    least(per_kael, per_lyra),
    greatest(per_kael, per_lyra),
    'Protector y protegida que evoluciona a compañeros de viaje. Kael ve en Lyra lo que él fue; Lyra ve en Kael lo que podría convertirse.');

  -- ── FASES ──────────────────────────────────────────────────
  insert into fases (id, user_id, proyecto_id, nombre, descripcion, posicion)
  values
    (gen_random_uuid(), uid, proy_id,
     'Acto I — El Despertar',
     'Lyra descubre su don. Es reclutada por la Orden. Conoce a Kael. Primer contacto con los Despertadores.',
     0)
  returning id into fase1_id;

  insert into fases (id, user_id, proyecto_id, nombre, descripcion, posicion)
  values
    (gen_random_uuid(), uid, proy_id,
     'Acto II — El Viaje',
     'Lyra y Kael viajan al Cristal Central. Se enfrentan a ambas facciones. Lyra pierde recuerdos. Kael recupera fragmentos de su resonancia.',
     1)
  returning id into fase2_id;

  insert into fases (id, user_id, proyecto_id, nombre, descripcion, posicion)
  values
    (gen_random_uuid(), uid, proy_id,
     'Acto III — La Resonancia Final',
     'Lyra llega al Cristal Central y descubre la verdad: los cristales no se apagan, están evolucionando. Debe elegir.',
     2)
  returning id into fase3_id;

  -- ── LUGARES ────────────────────────────────────────────────
  insert into lugares (id, user_id, proyecto_id, nombre, descripcion, posicion)
  values
    (gen_random_uuid(), uid, proy_id,
     'Torre del Eco',
     'Cuartel general de la Orden del Cristal Eterno. Una torre de cristal vivo que amplifica la resonancia. Desde su cima se puede sentir cada cristal del continente.',
     0)
  returning id into lugar1_id;

  insert into lugares (id, user_id, proyecto_id, nombre, descripcion, posicion)
  values
    (gen_random_uuid(), uid, proy_id,
     'Mercado de Sombras',
     'Bazar clandestino en las Marcas Grises donde se comercia con cristales muertos, información y servicios ilegales. Punto de encuentro de los Despertadores.',
     1)
  returning id into lugar2_id;
end;
$$ language plpgsql security definer;

-- ── Trigger: run on every new signup ─────────────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  perform seed_example_data(new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
