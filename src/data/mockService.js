// ============================================================
// MOTIVA FIELD — Serviço de Mock com Cenários
// Sprint 3 | Simula os estados reais de uma API: sucesso, erro,
// lista vazia e resposta lenta.
// ============================================================
import {
  occurrences, vegetacaoTrechos, historicoIntervencoes, ordemServico,
} from './mockData';

export const CENARIOS = {
  NORMAL:      'NORMAL',       // fluxo feliz, com dados
  VAZIO:       'VAZIO',        // operador sem ordens atribuídas
  ERRO_REDE:   'ERRO_REDE',    // falha de conexão em campo
  LENTO:       'LENTO',        // 3G ruim na rodovia
};

let cenarioAtual = CENARIOS.NORMAL;
const ouvintes = new Set();

export const getCenario = () => cenarioAtual;

export function setCenario(novo) {
  cenarioAtual = novo;
  ouvintes.forEach((fn) => fn(novo));
}

export function observarCenario(fn) {
  ouvintes.add(fn);
  return () => ouvintes.delete(fn);
}

const atraso = () =>
  new Promise((r) => setTimeout(r, cenarioAtual === CENARIOS.LENTO ? 3000 : 700));

// Envelope único de resposta — toda tela trata os mesmos quatro casos.
async function responder(dados, { msgVazio, msgErro }) {
  await atraso();

  if (cenarioAtual === CENARIOS.ERRO_REDE) {
    return { estado: 'ERRO', mensagem: msgErro ?? 'Sem conexão com o servidor Motiva. Verifique o sinal em campo.' };
  }
  if (cenarioAtual === CENARIOS.VAZIO) {
    return { estado: 'VAZIO', mensagem: msgVazio ?? 'Nenhum registro encontrado' };
  }

  const vazio = Array.isArray(dados) ? dados.length === 0 : dados == null;
  if (vazio) return { estado: 'VAZIO', mensagem: msgVazio ?? 'Nenhum registro encontrado' };

  return { estado: 'SUCESSO', dados };
}

export const buscarOcorrencias = () =>
  responder(occurrences, { msgVazio: 'Nenhuma ocorrência atribuída a você hoje' });

export const buscarTrechos = () =>
  responder(vegetacaoTrechos, { msgVazio: 'Nenhum trecho monitorado nesta região' });

export const buscarHistorico = () =>
  responder(historicoIntervencoes, { msgVazio: 'Você ainda não registrou intervenções' });

export const buscarOrdemAtiva = () =>
  responder(ordemServico, { msgVazio: 'Nenhuma ordem de serviço ativa no momento' });

// Fluxo alternativo: a conclusão do serviço pode falhar por falta de sinal.
export async function enviarConclusao(dadosServico) {
  await atraso();
  if (cenarioAtual === CENARIOS.ERRO_REDE) {
    return { estado: 'ERRO', mensagem: 'Não foi possível sincronizar. O registro ficou salvo no aparelho e será enviado quando houver sinal.' };
  }
  return { estado: 'SUCESSO', dados: { ...dadosServico, protocolo: `PRT-${Date.now().toString().slice(-6)}` } };
}