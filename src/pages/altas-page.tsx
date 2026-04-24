import { Briefcase, FileText, HeartPulse, Phone, Save, User, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../components/layout/header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { SelectField } from '../components/ui/select';

const sectionCard = 'border-border/60 shadow-elegant';
const sectionHeader = 'flex items-center gap-3 border-b border-border/60 bg-card/60 px-5 py-4 backdrop-blur-sm';
const sectionBody = 'p-5';

export function AltasPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Colaborador registrado correctamente');
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
                  <div className="space-y-2"><Label htmlFor="nombres">Nombres</Label><Input id="nombres" placeholder="Ej. Juan Carlos" required /></div>
                  <div className="space-y-2"><Label htmlFor="apPaterno">Apellido paterno</Label><Input id="apPaterno" placeholder="Ej. Quispe" required /></div>
                  <div className="space-y-2"><Label htmlFor="apMaterno">Apellido materno</Label><Input id="apMaterno" placeholder="Ej. Mamani" required /></div>
                  <div className="space-y-2"><Label htmlFor="dni">DNI</Label><Input id="dni" inputMode="numeric" maxLength={8} pattern="[0-9]{8}" placeholder="12345678" required /></div>
                  <div className="space-y-2"><Label htmlFor="cumple">Fecha de nacimiento</Label><Input id="cumple" type="date" required /></div>
                  <div className="space-y-2"><Label htmlFor="sexo">Sexo</Label><SelectField id="sexo" defaultValue=""><option value="" disabled>Selecciona</option><option value="f">Femenino</option><option value="m">Masculino</option><option value="o">Otro / Prefiere no decir</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="estadoCivil">Estado civil</Label><SelectField id="estadoCivil" defaultValue=""><option value="" disabled>Selecciona</option><option value="soltero">Soltero(a)</option><option value="casado">Casado(a)</option><option value="conviviente">Conviviente</option><option value="divorciado">Divorciado(a)</option><option value="viudo">Viudo(a)</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="nacionalidad">Nacionalidad</Label><Input id="nacionalidad" defaultValue="Peruana" /></div>
                  <div className="space-y-2"><Label htmlFor="email">Correo electronico</Label><Input id="email" type="email" placeholder="nombre@casatueste.pe" required /></div>
                  <div className="space-y-2"><Label htmlFor="tel">Celular</Label><Input id="tel" inputMode="tel" placeholder="+51 9XX XXX XXX" /></div>
                  <div className="space-y-2"><Label htmlFor="departamento">Departamento</Label><SelectField id="departamento" defaultValue=""><option value="" disabled>Selecciona</option><option value="lima">Lima</option><option value="arequipa">Arequipa</option><option value="cusco">Cusco</option><option value="trujillo">La Libertad</option><option value="piura">Piura</option><option value="lambayeque">Lambayeque</option><option value="ica">Ica</option><option value="callao">Callao</option><option value="junin">Junin</option><option value="puno">Puno</option><option value="otro">Otro</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="distrito">Distrito</Label><Input id="distrito" placeholder="Ej. Miraflores" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="dir">Direccion</Label><Input id="dir" placeholder="Av. / Jr. / Calle, numero, urbanizacion" /></div>
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
                  <div className="space-y-2"><Label htmlFor="puesto">Puesto</Label><SelectField id="puesto" defaultValue=""><option value="" disabled>Selecciona un puesto</option><option value="barista">Barista</option><option value="tostador">Tostador</option><option value="cajero">Cajero / Cajera</option><option value="mesero">Mozo / Moza</option><option value="repostero">Repostero</option><option value="almacen">Encargado de almacen</option><option value="gerente">Administrador / Gerente</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="area">Area</Label><SelectField id="area" defaultValue=""><option value="" disabled>Selecciona un area</option><option value="ops">Operaciones</option><option value="prod">Produccion</option><option value="atn">Atencion al cliente</option><option value="cocina">Cocina</option><option value="logistica">Logistica</option><option value="dir">Direccion</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="ingreso">Fecha de ingreso</Label><Input id="ingreso" type="date" required /></div>
                  <div className="space-y-2"><Label htmlFor="salario">Sueldo mensual (S/.)</Label><Input id="salario" type="number" min={0} step="50" placeholder="1500" /></div>
                  <div className="space-y-2"><Label htmlFor="tipoContrato">Tipo de contrato</Label><SelectField id="tipoContrato" defaultValue=""><option value="" disabled>Selecciona</option><option value="indef">Indefinido</option><option value="plazo">Plazo fijo</option><option value="parcial">Tiempo parcial</option><option value="practicas">Practicas pre-profesionales</option><option value="obra">Por obra o servicio</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="regimen">Regimen laboral</Label><SelectField id="regimen" defaultValue=""><option value="" disabled>Selecciona</option><option value="general">Regimen general</option><option value="mype">MYPE</option><option value="rxh">Recibo por honorarios</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="jornada">Jornada</Label><SelectField id="jornada" defaultValue=""><option value="" disabled>Selecciona</option><option value="completa">Tiempo completo (48 h)</option><option value="parcial">Tiempo parcial</option><option value="rotativa">Turnos rotativos</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="sucursal">Sede</Label><SelectField id="sucursal" defaultValue=""><option value="" disabled>Selecciona</option><option value="miraflores">Casa Tueste · Miraflores</option><option value="barranco">Casa Tueste · Barranco</option><option value="sanisidro">Casa Tueste · San Isidro</option><option value="surco">Casa Tueste · Surco</option></SelectField></div>
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
                  <div className="space-y-2"><Label htmlFor="pensiones">Sistema de pensiones</Label><SelectField id="pensiones" defaultValue=""><option value="" disabled>Selecciona</option><option value="onp">ONP</option><option value="afp-integra">AFP Integra</option><option value="afp-prima">AFP Prima</option><option value="afp-profuturo">AFP Profuturo</option><option value="afp-habitat">AFP Habitat</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="cuspp">CUSPP (si aplica)</Label><Input id="cuspp" placeholder="123456ABCDE12" /></div>
                  <div className="space-y-2"><Label htmlFor="salud">Regimen de salud</Label><SelectField id="salud" defaultValue="essalud"><option value="essalud">EsSalud</option><option value="eps">EPS</option><option value="sis">SIS</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="ruc">RUC (opcional)</Label><Input id="ruc" inputMode="numeric" maxLength={11} placeholder="10XXXXXXXXX" /></div>
                  <div className="space-y-2"><Label htmlFor="banco">Banco para deposito</Label><SelectField id="banco" defaultValue=""><option value="" disabled>Selecciona</option><option value="bcp">BCP</option><option value="bbva">BBVA</option><option value="interbank">Interbank</option><option value="scotiabank">Scotiabank</option><option value="nacion">Banco de la Nacion</option></SelectField></div>
                  <div className="space-y-2"><Label htmlFor="cci">CCI (20 digitos)</Label><Input id="cci" inputMode="numeric" maxLength={20} placeholder="00219100123456789012" /></div>
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
                  <div className="space-y-2"><Label htmlFor="emerNombre">Nombre completo</Label><Input id="emerNombre" placeholder="Ej. Rosa Mamani" /></div>
                  <div className="space-y-2"><Label htmlFor="emerParentesco">Parentesco</Label><Input id="emerParentesco" placeholder="Ej. Madre, esposo(a)" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="emerTel">Telefono de contacto</Label><Input id="emerTel" inputMode="tel" placeholder="+51 9XX XXX XXX" /></div>
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="emerNotas">Notas adicionales</Label><Input id="emerNotas" placeholder="Alergias, condiciones medicas relevantes..." /></div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline">Cancelar</Button>
            <Button type="submit" className="bg-gradient-primary text-primary-foreground shadow-glow"><Save className="h-4 w-4" /> Registrar colaborador</Button>
          </div>
        </form>
      </main>
    </>
  );
}
