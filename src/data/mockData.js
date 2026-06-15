// ============================================================
// MOTIVA FIELD — Mock de Dados
// Simula dados reais de vegetação em rodovias CCR/Motiva
// Sprint 2 | Cross-Platform | Prof. Hercules Lima
// ============================================================

export const currentUser = {
  id: 'op-001',
  name: 'Carlos Almeida',
  initials: 'CA',
  matricula: '4471',
  cpf: '123.456.789-00',
  role: 'Operador de Campo',
  setor: 'Manutenção Rodoviária',
};

export const occurrences = [
  {
    id: 'oc-001',
    rodovia: 'SP-270',
    km: 42,
    descricao: 'Vegetação de alto porte obstruindo visibilidade',
    status: 'CRITICO',
    prioridade: 5,
    crescimento: '1.2m / mês',
    previsaoConclusao: '4h 30min',
    lat: -23.5489,
    lng: -46.6388,
    photo: null,
    condicoesLocais: {
      temperatura: 28,
      clima: 'Ensolarado',
      umidadeRelativa: 15,
    },
    ultimaInspecao: '2026-05-20',
  },
  {
    id: 'oc-002',
    rodovia: 'SP-330',
    km: 118,
    descricao: 'Gramíneas invasoras na faixa de domínio',
    status: 'ALERTA',
    prioridade: 3,
    crescimento: '0.7m / mês',
    previsaoConclusao: '2h 15min',
    lat: -22.9568,
    lng: -47.0789,
    photo: null,
    condicoesLocais: {
      temperatura: 25,
      clima: 'Nublado',
      umidadeRelativa: 60,
    },
    ultimaInspecao: '2026-05-28',
  },
  {
    id: 'oc-003',
    rodovia: 'BR-101',
    km: 87,
    descricao: 'Roçada de manutenção preventiva',
    status: 'NORMAL',
    prioridade: 1,
    crescimento: '0.3m / mês',
    previsaoConclusao: '1h 00min',
    lat: -24.1200,
    lng: -46.4500,
    photo: null,
    condicoesLocais: {
      temperatura: 22,
      clima: 'Ensolarado',
      umidadeRelativa: 45,
    },
    ultimaInspecao: '2026-06-01',
  },
];

export const vegetacaoTrechos = [
  { trecho: 'SP-270 KM 40–50', ndvi: 0.82, risco: 'CRITICO',  ultimaRocada: '2026-02-10', proximaRocada: '2026-06-10' },
  { trecho: 'SP-270 KM 50–60', ndvi: 0.55, risco: 'ALERTA',   ultimaRocada: '2026-03-15', proximaRocada: '2026-07-15' },
  { trecho: 'SP-330 KM 110–120', ndvi: 0.61, risco: 'ALERTA', ultimaRocada: '2026-04-01', proximaRocada: '2026-08-01' },
  { trecho: 'BR-101 KM 80–90', ndvi: 0.30, risco: 'NORMAL',   ultimaRocada: '2026-05-20', proximaRocada: '2026-09-20' },
];

export const historicoIntervencoes = [
  { id: 'hi-001', data: '2026-06-01', rodovia: 'SP-270', km: 42, tipo: 'Roçada Emergencial',  operador: 'Carlos Almeida',  duracao: '3h 45min', status: 'CONCLUIDO' },
  { id: 'hi-002', data: '2026-05-20', rodovia: 'SP-330', km: 118, tipo: 'Roçada Preventiva',  operador: 'João Santos',     duracao: '2h 10min', status: 'CONCLUIDO' },
  { id: 'hi-003', data: '2026-05-15', rodovia: 'BR-101', km: 87,  tipo: 'Inspeção Visual',    operador: 'Ana Ferreira',    duracao: '1h 00min', status: 'CONCLUIDO' },
  { id: 'hi-004', data: '2026-06-07', rodovia: 'SP-270', km: 42,  tipo: 'Roçada Emergencial', operador: 'Carlos Almeida',  duracao: null,       status: 'EM_ANDAMENTO' },
];

export const ordemServico = {
  id: 'os-2026-001',
  numero: 'OS-2026-0607-001',
  ocorrencia: occurrences[0],
  operador: currentUser,
  dataEmissao: '2026-06-07',
  horaInicio: '08:15',
  tipo: 'Roçada Emergencial',
  instrucoes: [
    'Verificar condições de segurança antes de iniciar',
    'Utilizar EPI completo (capacete, colete, protetor auricular)',
    'Sinalizar faixa com cones a 100m de distância',
    'Registrar fotos antes e após o serviço',
    'Confirmar perímetro seguro antes de liberar a faixa',
  ],
  equipamentos: ['Roçadeira costal', 'Cones de sinalização', 'EPI completo'],
};

export const navigationMock = {
  destino: 'SP-270 KM 42',
  distanciaTotal: 4.2,
  tempoEstimado: 8,
  passos: [
    { instrucao: 'Siga em frente por 2.1 km',    distancia: '2.1 km' },
    { instrucao: 'Vire à direita na Rodovia SP-270', distancia: '400m'  },
    { instrucao: 'Continue por 1.7 km',           distancia: '1.7 km' },
    { instrucao: 'Destino à esquerda — KM 42',    distancia: '50m'    },
  ],
  proximaManobra: '400m ↪ direita',
};

export const statusColors = {
  CRITICO: { bg: '#FFE5E5', text: '#C02020', label: '⚠ RISCO: CRÍTICO'  },
  ALERTA:  { bg: '#FFF0E0', text: '#C05000', label: '⚡ ALERTA'           },
  NORMAL:  { bg: '#E5F5E5', text: '#206020', label: '✓ NORMAL'            },
};
