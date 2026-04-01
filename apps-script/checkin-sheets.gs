/**
 * Ruptura Final — Check-in Sheet Receiver
 * Cole este script em: Extensions > Apps Script, dentro da sua planilha.
 * Publique como Web App:
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copie a URL gerada e coloque em VITE_WEBHOOK_CHECKIN no .env e .env.production
 */

const SHEET_NAME = 'Check-in' // Nome da aba na planilha

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet()
    let   sheet = ss.getSheetByName(SHEET_NAME)

    // Cria a aba e o cabeçalho se não existirem
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME)
      sheet.appendRow([
        'Data/Hora',
        'Nome',         // A
        'E-mail',       // B
        'WhatsApp',     // C
        'Idade',        // D
        'Estado',       // E
        'Gênero',       // F
        'Profissão',    // G
        'Renda Mensal', // H
        'Tempo com Toledo', // I
        'Principal Objetivo',  // J
        'Pergunta pro Toledo', // K
        'Comunidade',   // L
      ])
      // Congela linha de cabeçalho
      sheet.setFrozenRows(1)
    }

    const data = JSON.parse(e.postData.contents)

    sheet.appendRow([
      new Date(),
      data.nome            || '',
      data.email           || '',
      data.whatsapp        || '',
      data.idade           || '',
      data.estado          || '',
      data.genero          || '',
      data.profissao       || '',
      data.renda           || '',
      data.tempoMarcelo    || '',
      data.objetivo        || '',
      data.perguntaMarcelo || '',
      data.comunidade      || '',
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Teste via execução manual no editor
function testeLocal() {
  const mock = {
    postData: {
      contents: JSON.stringify({
        nome: 'Teste Silva',
        email: 'teste@email.com',
        whatsapp: '11999999999',
        idade: '25-34 anos',
        estado: 'São Paulo',
        genero: 'Masculino',
        profissao: 'Desenvolvedor',
        renda: 'Entre R$ 4.000 e R$ 7.000 ao mês',
        tempoMarcelo: '1-2 anos',
        objetivo: 'Construir bons hábitos, Parar de procrastinar',
        perguntaMarcelo: 'Como você desenvolveu disciplina?',
        comunidade: 'Sim',
      }),
    },
  }
  const result = doPost(mock)
  Logger.log(result.getContent())
}
