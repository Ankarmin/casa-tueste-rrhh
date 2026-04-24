import { useState } from 'react';
import { Briefcase, FileText, HeartPulse, Phone, Save, User, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../components/layout/header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { SelectField } from '../components/ui/select';
import { unwrapResult } from '../lib/electron-api';

const sectionCard = 'border-border/60 shadow-elegant';
const sectionHeader = 'flex items-center gap-3 border-b border-border/60 bg-card/60 px-5 py-4 backdrop-blur-sm';
const sectionBody = 'p-5';

export function AltasPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      await unwrapResult(
        window.electronAPI.employees.create({
          nombres: String(formData.get('nombres') ?? ''),
          apellidoPaterno: String(formData.get('apPaterno') ?? ''),
          apellidoMaterno: String(formData.get('apMaterno') ?? ''),
          dni: String(formData.get('dni') ?? ''),
          fechaNacimiento: String(formData.get('cumple') ?? ''),
          sexo: String(formData.get('sexo') ?? ''),
          estadoCivil: String(formData.get('estadoCivil') ?? ''),
          nacionalidad: String(formData.get('nacionalidad') ?? ''),
          email: String(formData.get('email') ?? ''),
          telefono: String(formData.get('tel') ?? ''),
          departamento: String(formData.get('departamento') ?? ''),
          distrito: String(formData.get('distrito') ?? ''),
          direccion: String(formData.get('dir') ?? ''),
          puesto: String(formData.get('puesto') ?? ''),
          area: String(formData.get('area') ?? ''),
          fechaIngreso: String(formData.get('ingreso') ?? ''),
          salario: Number(formData.get('salario') ?? 0),
          tipoContrato: String(formData.get('tipoContrato') ?? ''),
          regimen: String(formData.get('regimen') ?? ''),
          jornada: String(formData.get('jornada') ?? ''),
          sede: String(formData.get('sucursal') ?? ''),
          sistemaPensiones: String(formData.get('pensiones') ?? ''),
          cuspp: String(formData.get('cuspp') ?? ''),
          regimenSalud: String(formData.get('salud') ?? ''),
          ruc: String(formData.get('ruc') ?? ''),
          banco: String(formData.get('banco') ?? ''),
          cci: String(formData.get('cci') ?? ''),
          emergenciaNombre: String(formData.get('emerNombre') ?? ''),
          emergenciaParentesco: String(formData.get('emerParentesco') ?? ''),
          emergenciaTelefono: String(formData.get('emerTel') ?? ''),
          emergenciaNotas: String(formData.get('emerNotas') ?? ''),
        }),
      );
      form.reset();
      toast.success('Colaborador registrado correctamente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo registrar el colaborador.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header title="Alta de personal" subtitle="Registra un nuevo colaborador en Casa Tueste" />
      <main className="animate-fade-in flex-1 overflow-y-auto p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-7xl space-y-5">
          <section className="rounded-2xl border-0 bg-gradient-primary px-5 py-4 text-primary-foreground shadow-elegant-lg">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-primary-foreground">Nuevo colaborador</h2>
                <p className="mt-1 text-sm text-primary-foreground/85">
                  Completa los datos personales, laborales, bancarios y de emergencia en un solo flujo.
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-primary-foreground/75">
                  <FileText className="h-3.5 w-3.5" /> La informacion quedara vinculada a contrato y planilla.
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-2">
            <Card className={sectionCard}>
              <div className={sectionHeader}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Datos personales</h3>
                  <p className="text-xs text-muted-foreground">Identificacion del colaborador</p>
                </div>
              </div>
              <div className={sectionBody}>
                <div className="grid gap-4 sm:grid-cols-2">
                   <div className="space-y-2"><Label htmlFor="nombres">Nombres</Label><Input id="nombres" name="nombres" placeholder="Ej. Juan Carlos" required /></div>
                   <div className="space-y-2"><Label htmlFor="apPaterno">Apellido paterno</Label><Input id="apPaterno" name="apPaterno" placeholder="Ej. Quispe" required /></div>
                   <div className="space-y-2"><Label htmlFor="apMaterno">Apellido materno</Label><Input id="apMaterno" name="apMaterno" placeholder="Ej. Mamani" required /></div>
                   <div className="space-y-2"><Label htmlFor="dni">DNI</Label><Input id="dni" name="dni" inputMode="numeric" maxLength={8} pattern="[0-9]{8}" placeholder="12345678" required /></div>
                   <div className="space-y-2"><Label htmlFor="cumple">Fecha de nacimiento</Label><Input id="cumple" name="cumple" type="date" required /></div>
                   <div className="space-y-2"><Label htmlFor="sexo">Sexo</Label><SelectField id="sexo" name="sexo" defaultValue=""><option value="" disabled>Selecciona</option><option value="f">Femenino</option><option value="m">Masculino</option><option value="o">Otro / Prefiere no decir</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="estadoCivil">Estado civil</Label><SelectField id="estadoCivil" name="estadoCivil" defaultValue=""><option value="" disabled>Selecciona</option><option value="soltero">Soltero(a)</option><option value="casado">Casado(a)</option><option value="conviviente">Conviviente</option><option value="divorciado">Divorciado(a)</option><option value="viudo">Viudo(a)</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="nacionalidad">Nacionalidad</Label><Input id="nacionalidad" name="nacionalidad" defaultValue="Peruana" /></div>
                   <div className="space-y-2"><Label htmlFor="email">Correo electronico</Label><Input id="email" name="email" type="email" placeholder="nombre@casatueste.pe" required /></div>
                   <div className="space-y-2"><Label htmlFor="tel">Celular</Label><Input id="tel" name="tel" inputMode="tel" placeholder="+51 9XX XXX XXX" /></div>
                   <div className="space-y-2"><Label htmlFor="departamento">Departamento</Label><SelectField id="departamento" name="departamento" defaultValue=""><option value="" disabled>Selecciona</option><option value="lima">Lima</option><option value="arequipa">Arequipa</option><option value="cusco">Cusco</option><option value="trujillo">La Libertad</option><option value="piura">Piura</option><option value="lambayeque">Lambayeque</option><option value="ica">Ica</option><option value="callao">Callao</option><option value="junin">Junin</option><option value="puno">Puno</option><option value="otro">Otro</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="distrito">Distrito</Label><Input id="distrito" name="distrito" placeholder="Ej. Miraflores" /></div>
                   <div className="space-y-2 sm:col-span-2"><Label htmlFor="dir">Direccion</Label><Input id="dir" name="dir" placeholder="Av. / Jr. / Calle, numero, urbanizacion" /></div>
                </div>
              </div>
            </Card>

            <Card className={sectionCard}>
              <div className={sectionHeader}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Briefcase className="h-4 w-4" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Informacion laboral</h3><p className="text-xs text-muted-foreground">Rol dentro de Casa Tueste</p></div>
              </div>
              <div className={sectionBody}>
                <div className="grid gap-4 sm:grid-cols-2">
                   <div className="space-y-2"><Label htmlFor="puesto">Puesto</Label><SelectField id="puesto" name="puesto" defaultValue=""><option value="" disabled>Selecciona un puesto</option><option value="barista">Barista</option><option value="tostador">Tostador</option><option value="cajero">Cajero / Cajera</option><option value="mesero">Mozo / Moza</option><option value="repostero">Repostero</option><option value="almacen">Encargado de almacen</option><option value="gerente">Administrador / Gerente</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="area">Area</Label><SelectField id="area" name="area" defaultValue=""><option value="" disabled>Selecciona un area</option><option value="ops">Operaciones</option><option value="prod">Produccion</option><option value="atn">Atencion al cliente</option><option value="cocina">Cocina</option><option value="logistica">Logistica</option><option value="dir">Direccion</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="ingreso">Fecha de ingreso</Label><Input id="ingreso" name="ingreso" type="date" required /></div>
                   <div className="space-y-2"><Label htmlFor="salario">Sueldo mensual (S/.)</Label><Input id="salario" name="salario" type="number" min={0} step="50" placeholder="1500" /></div>
                   <div className="space-y-2"><Label htmlFor="tipoContrato">Tipo de contrato</Label><SelectField id="tipoContrato" name="tipoContrato" defaultValue=""><option value="" disabled>Selecciona</option><option value="indef">Indefinido</option><option value="plazo">Plazo fijo</option><option value="parcial">Tiempo parcial</option><option value="practicas">Practicas pre-profesionales</option><option value="obra">Por obra o servicio</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="regimen">Regimen laboral</Label><SelectField id="regimen" name="regimen" defaultValue=""><option value="" disabled>Selecciona</option><option value="general">Regimen general</option><option value="mype">MYPE</option><option value="rxh">Recibo por honorarios</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="jornada">Jornada</Label><SelectField id="jornada" name="jornada" defaultValue=""><option value="" disabled>Selecciona</option><option value="completa">Tiempo completo (48 h)</option><option value="parcial">Tiempo parcial</option><option value="rotativa">Turnos rotativos</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="sucursal">Sede</Label><SelectField id="sucursal" name="sucursal" defaultValue=""><option value="" disabled>Selecciona</option><option value="miraflores">Casa Tueste · Miraflores</option><option value="barranco">Casa Tueste · Barranco</option><option value="sanisidro">Casa Tueste · San Isidro</option><option value="surco">Casa Tueste · Surco</option></SelectField></div>
                </div>
              </div>
            </Card>

            <Card className={sectionCard}>
              <div className={sectionHeader}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><HeartPulse className="h-4 w-4" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Seguridad social y bancarios</h3><p className="text-xs text-muted-foreground">Datos para planilla y pago de haberes</p></div>
              </div>
              <div className={sectionBody}>
                <div className="grid gap-4 sm:grid-cols-2">
                   <div className="space-y-2"><Label htmlFor="pensiones">Sistema de pensiones</Label><SelectField id="pensiones" name="pensiones" defaultValue=""><option value="" disabled>Selecciona</option><option value="onp">ONP</option><option value="afp-integra">AFP Integra</option><option value="afp-prima">AFP Prima</option><option value="afp-profuturo">AFP Profuturo</option><option value="afp-habitat">AFP Habitat</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="cuspp">CUSPP (si aplica)</Label><Input id="cuspp" name="cuspp" placeholder="123456ABCDE12" /></div>
                   <div className="space-y-2"><Label htmlFor="salud">Regimen de salud</Label><SelectField id="salud" name="salud" defaultValue="essalud"><option value="essalud">EsSalud</option><option value="eps">EPS</option><option value="sis">SIS</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="ruc">RUC (opcional)</Label><Input id="ruc" name="ruc" inputMode="numeric" maxLength={11} placeholder="10XXXXXXXXX" /></div>
                   <div className="space-y-2"><Label htmlFor="banco">Banco para deposito</Label><SelectField id="banco" name="banco" defaultValue=""><option value="" disabled>Selecciona</option><option value="bcp">BCP</option><option value="bbva">BBVA</option><option value="interbank">Interbank</option><option value="scotiabank">Scotiabank</option><option value="nacion">Banco de la Nacion</option></SelectField></div>
                   <div className="space-y-2"><Label htmlFor="cci">CCI (20 digitos)</Label><Input id="cci" name="cci" inputMode="numeric" maxLength={20} placeholder="00219100123456789012" /></div>
                </div>
              </div>
            </Card>

            <Card className={sectionCard}>
              <div className={sectionHeader}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Phone className="h-4 w-4" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Contacto de emergencia</h3><p className="text-xs text-muted-foreground">Persona a contactar ante emergencias</p></div>
              </div>
              <div className={sectionBody}>
                <div className="grid gap-4 sm:grid-cols-2">
                   <div className="space-y-2"><Label htmlFor="emerNombre">Nombre completo</Label><Input id="emerNombre" name="emerNombre" placeholder="Ej. Rosa Mamani" /></div>
                   <div className="space-y-2"><Label htmlFor="emerParentesco">Parentesco</Label><Input id="emerParentesco" name="emerParentesco" placeholder="Ej. Madre, esposo(a)" /></div>
                   <div className="space-y-2 sm:col-span-2"><Label htmlFor="emerTel">Telefono de contacto</Label><Input id="emerTel" name="emerTel" inputMode="tel" placeholder="+51 9XX XXX XXX" /></div>
                   <div className="space-y-2 sm:col-span-2"><Label htmlFor="emerNotas">Notas adicionales</Label><Input id="emerNotas" name="emerNotas" placeholder="Alergias, condiciones medicas relevantes..." /></div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
             <Button type="reset" variant="outline" disabled={isSubmitting}>Cancelar</Button>
             <Button type="submit" className="bg-gradient-primary text-primary-foreground shadow-glow" disabled={isSubmitting}><Save className="h-4 w-4" /> {isSubmitting ? 'Registrando...' : 'Registrar colaborador'}</Button>
           </div>
        </form>
      </main>
    </>
  );
}
