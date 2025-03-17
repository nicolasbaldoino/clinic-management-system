import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

async function main() {
  // Limpar dados existentes
  await prisma.appointment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.professional.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();
  await prisma.clinic.deleteMany();

  // Criar clínicas
  const clinics = await Promise.all([
    prisma.clinic.create({
      data: {
        id: '1',
        name: 'Clínica São Paulo',
      },
    }),
    prisma.clinic.create({
      data: {
        id: '2',
        name: 'Clínica Rio de Janeiro',
      },
    }),
    prisma.clinic.create({
      data: {
        id: '3',
        name: 'Clínica Belo Horizonte',
      },
    }),
  ]);

  // Criar usuários administradores
  const adminPassword = await hashPassword('senha123');

  await Promise.all(
    clinics.map((clinic, index) =>
      prisma.user.create({
        data: {
          email: `admin${index + 1}@clinica.com`,
          password: adminPassword,
          role: UserRole.ADMIN,
          clinicId: clinic.id,
        },
      }),
    ),
  );

  // Criar pacientes
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        name: 'João Silva',
        cpf: '123.456.789-00',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Maria Santos',
        cpf: '987.654.321-00',
        email: 'maria.santos@email.com',
        phone: '(11) 98765-1234',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Pedro Oliveira',
        cpf: '456.789.123-00',
        email: 'pedro.oliveira@email.com',
        phone: '(11) 98765-5678',
      },
    }),
    prisma.patient.create({
      data: {
        name: 'Ana Costa',
        cpf: '789.123.456-00',
        email: 'ana.costa@email.com',
        phone: '(11) 98765-8765',
      },
    }),
  ]);

  // Criar profissionais
  const professionalPassword = await hashPassword('senha123');
  const specialties = [
    'Cardiologia',
    'Dermatologia',
    'Ortopedia',
    'Pediatria',
    'Neurologia',
    'Oftalmologia',
  ];

  await Promise.all(
    clinics.flatMap((clinic) =>
      // Criar 2 profissionais por clínica
      [0, 1].map((i) =>
        prisma.professional.create({
          data: {
            name: `Dr. ${i === 0 ? 'Carlos' : 'Ana'} ${clinic.name.split(' ')[1]}`,
            email: `profissional${i + 1}.${clinic.name.split(' ')[1].toLowerCase()}@clinica.com`,
            password: professionalPassword,
            speciality: specialties[Math.floor(Math.random() * specialties.length)],
            clinicId: clinic.id,
          },
        }),
      ),
    ),
  );

  // Criar alguns horários disponíveis para os profissionais
  const professionals = await prisma.professional.findMany();
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  await Promise.all(
    professionals.flatMap((professional) =>
      // Criar horários para os próximos 7 dias
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        return [
          // Horários da manhã
          prisma.schedule.create({
            data: {
              professionalId: professional.id,
              date,
              startTime: '09:00',
              endTime: '10:00',
              status: 'AVAILABLE',
            },
          }),
          prisma.schedule.create({
            data: {
              professionalId: professional.id,
              date,
              startTime: '10:00',
              endTime: '11:00',
              status: 'AVAILABLE',
            },
          }),
          // Horários da tarde
          prisma.schedule.create({
            data: {
              professionalId: professional.id,
              date,
              startTime: '14:00',
              endTime: '15:00',
              status: 'AVAILABLE',
            },
          }),
          prisma.schedule.create({
            data: {
              professionalId: professional.id,
              date,
              startTime: '15:00',
              endTime: '16:00',
              status: 'AVAILABLE',
            },
          }),
        ];
      }).flat(),
    ),
  );

  console.log('🌱 Seed executado com sucesso');
  console.log('📊 Resumo:');
  console.log(`- ${clinics.length} clínicas criadas`);
  console.log(`- ${clinics.length} administradores criados`);
  console.log(`- ${patients.length} pacientes criados`);
  console.log(`- ${professionals.length} profissionais criados`);
  console.log(`- ${professionals.length * 7 * 4} horários criados`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 