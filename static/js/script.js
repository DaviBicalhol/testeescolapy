// ============================================================
// 1. VARIÁVEIS GLOBAIS (Sempre no topo)
// ============================================================
let turmaAtual = "";
let tentativasPorTurma = {};
let bilhetesAtuais = [];
let indiceAtual = 0;

// ============================================================
// 2. BANCO DE DADOS DE BILHETES
// ============================================================
const bancoDeAvisos = {
    "406": { senha: "604", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "407": { senha: "704", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "415": { senha: "514", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "416": { senha: "614", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "512": { senha: "215", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "513": { senha: "315", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "514": { senha: "415", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "601": { senha: "106", avisos: [{ d: "26/01/2026", t: "Informamos que no dia 13/03 (sexta-feira), às 7h30, será realizada a palestra <b><q>Acompanhamento da Vida Escolar</q></b> do Estudante, com o palestrante e psicólogo Vinícius, da Vinibios Consultoria Educacional, destinada aos estudantes do 6º ano e seus responsáveis.<br><br> A participação das famílias é muito importante para fortalecer o acompanhamento da vida escolar dos estudantes e contribuir para o seu desenvolvimento.<br><br> Contamos com a presença de todos!" }, { d: "11/03/2026", t: "Datas das avaliações mensais: <br> <ul> <li>11/03: Ciências <li> 12/03: Matemática <li>17/03: Arte <li>19/03: História<li>20/03: Português " }] },
    "602": { senha: "206", avisos: [{ d: "26/01/2026", t: "Informamos que no dia 13/03 (sexta-feira), às 7h30, será realizada a palestra <b><q>Acompanhamento da Vida Escolar</q></b> do Estudante, com o palestrante e psicólogo Vinícius, da Vinibios Consultoria Educacional, destinada aos estudantes do 6º ano e seus responsáveis.<br><br> A participação das famílias é muito importante para fortalecer o acompanhamento da vida escolar dos estudantes e contribuir para o seu desenvolvimento.<br><br> Contamos com a presença de todos!" }, { d: "11/03/2026", t: "Datas das avaliações mensais: <br> <ul> <li>11/03: Ciências <li> 12/03: Matemática <li>17/03: Arte <li>19/03: História<li>20/03: Português " }] },
    "603": { senha: "306", avisos: [{ d: "26/01/2026", t: "Informamos que no dia 13/03 (sexta-feira), às 7h30, será realizada a palestra <b><q>Acompanhamento da Vida Escolar</q></b> do Estudante, com o palestrante e psicólogo Vinícius, da Vinibios Consultoria Educacional, destinada aos estudantes do 6º ano e seus responsáveis.<br><br> A participação das famílias é muito importante para fortalecer o acompanhamento da vida escolar dos estudantes e contribuir para o seu desenvolvimento.<br><br> Contamos com a presença de todos!" }, { d: "11/03/2026", t: "Datas das avaliações mensais: <br> <ul> <li>11/03: Ciências <li> 12/03: Matemática <li>16/03: Arte <li>20/03: Português e História " }] },
    "704": { senha: "407", avisos: [{ d: "26/01/2026", t: "Atenção!<br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br>⏰ 7h30min às 8h30min <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br><br> Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>11/03: Ciências <li>12/03: Matemática <li> 13/03: Arte <li> 20/03: Português e Geografia" }] },
    "705": { senha: "507", avisos: [{ d: "26/01/2026", t: "Atenção!<br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br>⏰ 7h30min às 8h30min <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br><br> Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>11/03: Ciências <li>12/03: Matemática <li> 13/03: Arte <li> 20/03: Português e Geografia" }] },
    "809": { senha: "908", avisos: [{ d: "26/01/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br> ⏰ 16h às 17h A <br><br>família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11<br><br>Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>12/03: Arte <li>13/03: Ciências <li> 17/03: Geografia <li> 19/03: Matemática <li>20/03: Português" }] },
    "811": { senha: "118", avisos: [{ d: "26/01/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br> ⏰ 16h às 17h A <br><br>família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11<br><br>Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>12/03: Arte <li>13/03: Ciências <li> 17/03: Geografia <li> 19/03: Matemática <li>20/03: Português" }] },
    "908": { senha: "809", avisos: [{ d: "05/03/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br> 📅 Sexta-feira, 06/03/26 <br> ⏰ 16h às 17h <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br> 📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br> Contamos com a presença de todos. <br> <b> Atenciosamente, Equipe Gestora <b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>12/03: Matemática <li>13/03: Arte <li> 17/03: Geografia <li> 19/03: Ciências" }] },
    "910": { senha: "019", avisos: [{ d: "05/03/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br> 📅 Sexta-feira, 06/03/26 <br> ⏰ 16h às 17h <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br> 📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br> Contamos com a presença de todos. <br> <b> Atenciosamente, Equipe Gestora <b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>12/03: Matemática <li>13/03: Arte <li> 17/03: Geografia <li>18/03: Matemática<li> 19/03: Ciências" }] },


    // ============================================================
    //                        AVISOS TARDE
    // ============================================================

    "112": { senha: "211", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "113": { senha: "311", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "114": { senha: "411", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "205": { senha: "502", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "206": { senha: "602", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "207": { senha: "702", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "304": { senha: "403", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "315": { senha: "513", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "316": { senha: "613", avisos: [{ d: "26/01/2026", t: "Nenhum aviso para hoje." }] },
    "601 (Tarde)": { senha: "106", avisos: [{ d: "26/01/2026", t: "Informamos que no dia 13/03 (sexta-feira), às 7h30, será realizada a palestra <b><q>Acompanhamento da Vida Escolar</q></b> do Estudante, com o palestrante e psicólogo Vinícius, da Vinibios Consultoria Educacional, destinada aos estudantes do 6º ano e seus responsáveis.<br><br> A participação das famílias é muito importante para fortalecer o acompanhamento da vida escolar dos estudantes e contribuir para o seu desenvolvimento.<br><br> Contamos com a presença de todos!." }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>17/03: Geografia e Matemática <li>18/03: Ciências <li> 20/03: Português" }] },
    "602 (Tarde)": { senha: "206", avisos: [{ d: "26/01/2026", t: "Informamos que no dia 13/03 (sexta-feira), às 7h30, será realizada a palestra <b><q>Acompanhamento da Vida Escolar</q></b> do Estudante, com o palestrante e psicólogo Vinícius, da Vinibios Consultoria Educacional, destinada aos estudantes do 6º ano e seus responsáveis.<br><br> A participação das famílias é muito importante para fortalecer o acompanhamento da vida escolar dos estudantes e contribuir para o seu desenvolvimento.<br><br> Contamos com a presença de todos!" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>17/03: Geografia e Matemática <li>19/03: Ciências <li> 20/03: Português " }] },


    "709": { senha: "907", avisos: [{ d: "26/01/2026", t: "Atenção!<br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br>⏰ 7h30min às 8h30min <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br><br> Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>11/03: Matemática <li>12/03: Português <li> 19/03: Geografia e Ciências" }] },
    "710": { senha: "017", avisos: [{ d: "26/01/2026", t: "Atenção!<br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br>⏰ 7h30min às 8h30min <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br><br> Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>11/03: Matemática <li>12/03: Português <li> 18/03: Ciências <li>19/03: Geografia" }] },


    "803": { senha: "308", avisos: [{ d: "26/01/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br>📅 Sexta-feira <br> ⏰ 16h às 17h A <br><br>família que não puder comparecer nesse horário poderá retirar o livro: <br><br>📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11<br><br>Contamos com a presença de todos. <br> <b>Atenciosamente, Equipe Gestora<b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>12/03: Português e Matemática <li>16/03: Ciências" }] },

    "908 (Tarde)": { senha: "809", avisos: [{ d: "05/03/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br> 📅 Sexta-feira, 06/03/26 <br> ⏰ 16h às 17h <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br> 📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br> Contamos com a presença de todos. <br> <b> Atenciosamente, Equipe Gestora <b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>13/03: Português <li>16/03: Ciências <li> 19/03: Matemática <li>20/03: Geografia" }] },
    "911": { senha: "119", avisos: [{ d: "05/03/2026", t: "Atenção! <br> Informamos que haverá reunião para entrega de livros didáticos na: <br><br> 📅 Sexta-feira, 06/03/26 <br> ⏰ 16h às 17h <br><br> A família que não puder comparecer nesse horário poderá retirar o livro: <br><br> 📌 Sexta-feira: das 13h às 15h <br>📌 Segunda-feira: das 9h às 11h <br> Contamos com a presença de todos. <br> <b> Atenciosamente, Equipe Gestora <b>" }, { d: "11/03/2026", t: "Data das avaliações mensais: <br> <ul> <li>13/03: Português <li>16/03: Ciências <li> 19/03: Matemática <li>20/03: Geografia" }] }
};


// ============================================================
// 3. FUNÇÕES DE ACESSO E MODAL
// ============================================================

function abrirLogin(idTurma) {
    turmaAtual = idTurma;
    const modal = document.getElementById('modalBilhetes');
    const campoSenha = document.getElementById('campoSenha');
    const msgErro = document.getElementById('mensagemErro');
    const btn = document.getElementById('btnConfirmarSenha');

    document.getElementById('areaLogin').style.display = "block";
    document.getElementById('areaConteudo').style.display = "none";
    campoSenha.value = "";
    campoSenha.classList.remove('input-erro');

    if (tentativasPorTurma[idTurma] >= 3) {
        btn.disabled = true;
        btn.style.backgroundColor = "#ccc";
        msgErro.innerText = "Esta turma está bloqueada temporariamente.";
        msgErro.style.display = "block";
    } else {
        btn.disabled = false;
        btn.style.backgroundColor = "";
        msgErro.style.display = "none";
    }

    document.getElementById('tituloTurma').innerText = "Acesso - Turma " + idTurma;
    modal.style.display = "block";
    setTimeout(() => campoSenha.focus(), 100);
}

function validarSenha() {
    const campoSenha = document.getElementById('campoSenha');
    const msgErro = document.getElementById('mensagemErro');
    const btn = document.getElementById('btnConfirmarSenha');
    const dados = bancoDeAvisos[turmaAtual];

    if (!tentativasPorTurma[turmaAtual]) tentativasPorTurma[turmaAtual] = 0;
    if (btn.disabled) return;

    if (dados && campoSenha.value === dados.senha) {
        tentativasPorTurma[turmaAtual] = 0;
        document.getElementById('areaLogin').style.display = "none";
        document.getElementById('areaConteudo').style.display = "block";

        // NOVO: Prepara o menu e esconde as seções
        document.getElementById('menuEscolha').style.display = "flex";
        document.getElementById('secaoAvisos').style.display = "none";
        document.getElementById('secaoGaleria').style.display = "none";
        document.getElementById('boasVindasTurma').innerText = "Olá, Turma " + turmaAtual + "!";

        bilhetesAtuais = dados.avisos;
        indiceAtual = bilhetesAtuais.length - 1;

    } else {
        tentativasPorTurma[turmaAtual]++;
        if (tentativasPorTurma[turmaAtual] >= 3) {
            btn.disabled = true;
            btn.style.backgroundColor = "#ccc";
            msgErro.innerText = "Bloqueado por 60s.";
            msgErro.style.display = "block";
            setTimeout(() => { tentativasPorTurma[turmaAtual] = 0; btn.disabled = false; btn.style.backgroundColor = ""; msgErro.style.display = "none"; }, 60000);
        } else {
            msgErro.innerText = "Senha incorreta! Tentativa " + tentativasPorTurma[turmaAtual] + " de 3.";
            msgErro.style.display = "block";
            campoSenha.classList.add('input-erro');
        }
    }
    campoSenha.value = "";
}
// ============================================================
// 4. NAVEGAÇÃO (VOLTAR AO TOPO)
// ============================================================
const botaoTopo = document.getElementById("btnTopo");

window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if (botaoTopo) botaoTopo.style.display = "block";
    } else {
        if (botaoTopo) botaoTopo.style.display = "none";
    }
});

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================================
// 5. LÓGICA DO CARROSSEL (SETINHAS)
// ============================================================

function renderizarAviso() {
    const container = document.getElementById('listaBilhetes');
    const indicador = document.getElementById('indicadorBilhete');
    const btnAnt = document.getElementById('btnAnterior');
    const btnProx = document.getElementById('btnProximo');

    const aviso = bilhetesAtuais[indiceAtual];

    container.innerHTML = `
        <div class="bilhete-item">
            <small style="color: #888; font-weight: bold; display: block; margin-bottom: 5px;">
                Publicado em: ${aviso.d}
            </small>
            <p>${aviso.t}</p>
        </div>
    `;

    if (bilhetesAtuais.length > 1) {
        indicador.innerText = `Aviso ${indiceAtual + 1} de ${bilhetesAtuais.length}`;
        btnAnt.style.visibility = "visible";
        btnProx.style.visibility = "visible";
        btnAnt.disabled = (indiceAtual === 0);
        btnProx.disabled = (indiceAtual === bilhetesAtuais.length - 1);
    } else {
        indicador.innerText = "";
        btnAnt.style.visibility = "hidden";
        btnProx.style.visibility = "hidden";
    }
}

function mudarBilhete(direcao) {
    indiceAtual += direcao;
    renderizarAviso();
}

// ============================================================
// 5. BANNER, EVENTOS E HISTÓRIA
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    const btnConfirmar = document.getElementById('btnConfirmarSenha');
    const campoSenha = document.getElementById('campoSenha');
    if (btnConfirmar) btnConfirmar.addEventListener('click', validarSenha);
    if (campoSenha) campoSenha.addEventListener('keypress', (e) => { if (e.key === 'Enter') validarSenha(); });

    // Banner Slide
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide-foto');
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    const blocos = document.querySelectorAll('.bloco-historia');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('aparecer'); });
    }, { threshold: 0.15 });
    blocos.forEach(b => observer.observe(b));
});

function fecharModal() { document.getElementById('modalBilhetes').style.display = "none"; }
function voltarAoTopo() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// --- LÓGICA DO CALENDÁRIO DE EVENTOS ---
document.addEventListener("DOMContentLoaded", () => {
    const listaEventos = document.getElementById('lista-eventos');

    const eventos = [
        {
            data: '2026-02-26',
            titulo: 'Retorno da Escola Integrada',
            descricao: 'Prezadas famílias,<br><br>Informamos que amanhã, 26/02 (quinta-feira), terão início as aulas da Escola Integrada para os estudantes veteranos, ou seja, aqueles que já frequentavam a Integrada no ano de 2025.<br><br>Neste primeiro momento, o atendimento será destinado apenas a esses alunos, para que possamos organizar as turmas e acolher as crianças com tranquilidade.<br><br>Em breve, enviaremos novas orientações sobre o início para os demais estudantes.'
        },
        { data: '2026-02-28', titulo: 'Assembleia Escolar', descricao: 'Pauta:<br><ul><li>Apresentação equipe gestão escolar 2026; <li>Regras e regimento escolar; <li>Entrega de uniforme escolar; <li> Apresentação site da escola; <li> Finalização obras PEI;  <li> Prestação de contas 2025;  <li>Informes Gerais..' },
        { data: '2026-03-10', titulo: 'Avaliações mensais', descricao: 'Período de avaliações mensais do 1º trimestre. Entre os dias 10/03 e 20/03. <b>Para mais informações acesse a turma do aluno.</b>' },
        { data: '2026-04-13', titulo: 'Avaliação trimestral', descricao: 'Início das provas trimestrais para todas as turmas. Entre os dias 13/04 e 17/04' }
    ];

    const hoje = new Date();

    eventos.forEach(evento => {
        const dataEvento = new Date(evento.data + "T00:00:00");
        const diffDias = Math.ceil((dataEvento - hoje) / (1000 * 60 * 60 * 24));

        const card = document.createElement('div');
        card.classList.add('evento-card');
        card.style.cursor = 'pointer';

        if (diffDias >= 0 && diffDias <= 7) card.classList.add('evento-proximo');

        const dataFormatada = dataEvento.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        card.innerHTML = `
            <span class="evento-data">${dataFormatada}</span>
            <h3 class="evento-titulo">${evento.titulo}</h3>
            <small style="color: #666">Clique para ver detalhes</small>
            
        `;

        card.onclick = () => {
            const modal = document.getElementById('modalBilhetes');
            const areaLogin = document.getElementById('areaLogin');
            const areaConteudo = document.getElementById('areaConteudo');
            const menuEscolha = document.getElementById('menuEscolha');
            const secaoAvisos = document.getElementById('secaoAvisos');
            const lista = document.getElementById('listaBilhetes');
            const btnVoltar = secaoAvisos.querySelector('.btn-voltar');
            const fraseSubAviso = secaoAvisos.querySelector('.sub-aviso');

            if (areaLogin) areaLogin.style.display = "none";
            if (menuEscolha) menuEscolha.style.display = "none";
            if (document.getElementById('boasVindasTurma')) {
                document.getElementById('boasVindasTurma').style.display = "none";
            }

            if (btnVoltar) btnVoltar.style.display = "none";
            if (fraseSubAviso) fraseSubAviso.style.display = "none";

            if (areaConteudo) areaConteudo.style.display = "block";
            if (secaoAvisos) secaoAvisos.style.display = "block";

            document.getElementById('tituloTurma').innerText = evento.titulo;
            lista.innerHTML = `
        <div class="bilhete-item">
            <p style="font-size: 1.1rem; line-height: 1.6; color: #333;">${evento.descricao}</p>
        </div>
    `;

            document.getElementById('indicadorBilhete').innerText = "";
            document.getElementById('btnAnterior').style.visibility = "hidden";
            document.getElementById('btnProximo').style.visibility = "hidden";

            // 6. ABRE O MODAL
            if (modal) modal.style.display = "block";
        };
        listaEventos.appendChild(card);
    });
});
// Função para exibir o aviso (Versão Anti-Bloqueio Hostinger)
function abrirAvisoEvento(titulo, descricao) {
    const modal = document.getElementById('modalBilhetes');
    const lista = document.getElementById('listaBilhetes');

    document.getElementById('tituloTurma').innerText = titulo;

    lista.innerHTML = `
        <div class="bilhete-item" style="display: block !important; opacity: 1 !important;">
            <p style="color: #333; line-height: 1.6;">${descricao}</p>
        </div>
    `;

    document.getElementById('indicadorBilhete').innerText = "";
    document.getElementById('btnAnterior').style.visibility = "hidden";
    document.getElementById('btnProximo').style.visibility = "hidden";

    // Abre o modal
    if (modal) modal.style.display = "block";
}

// ============================================================
// 6. FUNÇÕES DO NOVO MENU E GALERIA
// ============================================================


function mostrarSecao(tipo) {
    const menu = document.getElementById('menuEscolha');
    const boasVindas = document.getElementById('boasVindasTurma');
    const avisos = document.getElementById('secaoAvisos');
    const galeria = document.getElementById('secaoGaleria');

    if (menu) menu.style.display = "none";
    if (boasVindas) boasVindas.style.display = "none";

    if (tipo === 'avisos') {
        if (avisos) avisos.style.display = "block";
        if (galeria) galeria.style.display = "none";
        renderizarAviso();
    } else if (tipo === 'galeria') {
        if (galeria) galeria.style.display = "block";
        if (avisos) avisos.style.display = "none";

        carregarFotosPython(turmaAtual);
    }
}

function voltarAoMenu() {
    const menu = document.getElementById('menuEscolha');
    const boasVindas = document.getElementById('boasVindasTurma');
    const avisos = document.getElementById('secaoAvisos');
    const galeria = document.getElementById('secaoGaleria');

    if (avisos) avisos.style.display = "none";
    if (galeria) galeria.style.display = "none";
    if (boasVindas) boasVindas.style.display = "block";
    if (menu) menu.style.display = "flex";
}

// ============================================================
// 7. INTEGRAÇÃO DINÂMICA COM O BANCO DE DADOS (PYTHON) E FILTROS
// ============================================================

let todasAsFotosDaTurma = [];

function carregarFotosPython(turma) {
    const container = document.getElementById('galeriaFotos');
    if (!container) return; 

    container.innerHTML = "<p style='text-align:center; color:#23ad11;'><i class='fas fa-spinner fa-spin'></i> Buscando fotos...</p>";

    fetch(`/api/fotos/${turma}`)
        .then(res => res.json())
        .then(fotos => {
            todasAsFotosDaTurma = fotos; 
            limparFiltros(); 
        })
        .catch(err => {
            console.error("Erro na API:", err);
            container.innerHTML = "<p style='color:red; text-align:center;'>Erro ao conectar com o banco de dados.</p>";
        });
}

function aplicarFiltros() {
    const container = document.getElementById('galeriaFotos');
    const comboMateria = document.getElementById('filtroMateria');
    const inputData = document.getElementById('filtroData');

    const materiaSelecionada = comboMateria ? comboMateria.value : "";
    const dataSelecionada = inputData ? inputData.value : "";

    container.innerHTML = ""; 

    const fotosFiltradas = todasAsFotosDaTurma.filter(foto => {
        const bateMateria = materiaSelecionada === "" || foto.materia === materiaSelecionada;

        let bateData = true;
        if (dataSelecionada) {
            // Converte a data do HTML (YYYY-MM-DD) para a do Python (DD/MM/YYYY)
            const partes = dataSelecionada.split('-');
            const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
            bateData = foto.data.includes(dataFormatada);
        }

        return bateMateria && bateData;
    });

    if (fotosFiltradas.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:30px; color:#888; grid-column: 1/-1;">
                <i class="fas fa-search" style="font-size:2.5rem; margin-bottom:15px;"></i>
                <p>Nenhum registro encontrado com esses filtros.</p>
            </div>`;
        return;
    }

    fotosFiltradas.forEach(f => {
        container.innerHTML += `
            <div class="card-postagem" style="margin-bottom:20px; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08); border: 1px solid #eee;">
                <img src="/static/img/uploads/galeria/${f.nome_arquivo}" onerror="this.parentElement.style.display='none';" style="width:100%; display:block; max-height: 400px; object-fit: cover;">
                <div style="padding:15px;">
                    <h4 style="margin:0 0 5px 0; color:#23ad11; font-size: 1.1rem;">${f.materia}</h4>
                    
                    ${f.descricao ? `<p style="color:#444; font-size:0.9rem; margin:10px 0; border-left:3px solid #23ad11; padding-left:10px; font-style:italic;">${f.descricao}</p>` : ''}

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <small style="color:#666;">
                            <i class="far fa-calendar-alt"></i> ${f.data_postagem}
                        </small>

                        <a href="/static/img/uploads/galeria/${f.nome_arquivo}" 
                           download="Aula_${f.materia}_${f.data_postagem}.jpg" 
                           style="text-decoration: none; color: #23ad11; font-weight: bold; font-size: 0.85rem; display: flex; align-items: center; gap: 5px;">
                           <i class="fas fa-download"></i> Baixar
                        </a>
                    </div>
                </div>
            </div>`;
    });
}
function limparFiltros() {
    const comboMateria = document.getElementById('filtroMateria');
    const inputData = document.getElementById('filtroData');

    if (comboMateria) comboMateria.value = "";
    if (inputData) inputData.value = "";

    aplicarFiltros();
}  