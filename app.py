


from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import os
import sqlite3
from datetime import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'chave_secreta_super_segura_dom_bosco' # Necessário para o login funcionar

# ============================================================
# ROTA PRINCIPAL (ABRIR O SITE)
# ============================================================
@app.route('/')
def index():
    return render_template('index.html')

# ============================================================
# ROTA PARA A PÁGINA DE LOGIN DO REPRESENTANTE
# ============================================================
@app.route('/login_rep', methods=['GET', 'POST'])
def login_rep():
    erro = None
    if request.method == 'POST':
        # Pega o que o usuário digitou no HTML
        turma_digitada = request.form.get('turma')
        senha_digitada = request.form.get('senha')

        # Verifica se a turma existe no dicionário e se a senha bate
        if turma_digitada in SENHAS_REPRESENTANTES and SENHAS_REPRESENTANTES[turma_digitada] == senha_digitada:
            # Salva o usuário na 'sessão' (memória do navegador)
            session['representante_logado'] = turma_digitada
            return redirect(url_for('upload_rep')) # Manda para a área restrita
        else:
            erro = "Turma ou senha incorretos. Tente novamente."

    # Se for GET (apenas abrindo a página) ou se deu erro, mostra o login
    return render_template('login_rep.html', erro=erro)

# ============================================================
# ROTA DA ÁREA RESTRITA (Para onde ele vai após logar)
# ============================================================
@app.route('/upload_rep')
def upload_rep():
    if 'representante_logado' not in session:
        return redirect(url_for('login_rep'))
    
    # Forçamos a turma a ser uma string para o banco não se confundir
    turma = str(session['representante_logado'])
    
    conn = conectar_banco()
    # Buscamos as fotos. Se no banco estiver como número, o SQLite converte 
    # automaticamente ao comparar com a string da variável 'turma'
    fotos_turma = conn.execute('SELECT * FROM galeria WHERE turma = ? ORDER BY id DESC', (turma,)).fetchall()
    conn.close()
    
    return render_template('upload_rep.html', turma=turma, fotos=fotos_turma)


# 👉 ADICIONE ESSA ROTA AQUI:
@app.route('/historia')
def historia():
    return render_template('historia.html')

# Configuração correta baseada na sua estrutura de pastas
UPLOAD_FOLDER = os.path.join('static', 'img', 'uploads', 'galeria')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Isso aqui é importante: ele cria as pastas automaticamente se elas sumirem
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Simulação das senhas dos representantes
SENHAS_REPRESENTANTES = {
    
    #TURMAS MANHÃ
    "601": "rep601@dom", "602": "rep602@dom", 
    "603": "rep603@dom", "704": "rep704@dom", "705": "rep705@dom",
    "809": "rep809@dom", "811": "rep811@dom",
    "908": "rep908@dom", "910": "rep910@dom",
    
    #TURMA TARDE
    "601 (Tarde)": "rep601t@dom", "602 (Tarde)": "rep602t@dom",
    "709": "rep709@dom", "710": "rep710@dom",
    "803": "rep803@dom", "908 (Tarde)": "rep908t@dom", 
    "911": "rep911@dom"
}

@app.route('/turma/<id_turma>')
def exibir_turma(id_turma):
    conn = conectar_banco()
    fotos = conn.execute('SELECT * FROM galeria WHERE turma = ? ORDER BY id DESC', (id_turma,)).fetchall()
    conn.close()
    
    # --- LINHA DE TESTE: VAI APARECER NO TERMINAL DO VS CODE ---
    if fotos:
        print(f"DEBUG: Colunas encontradas: {fotos[0].keys()}")
        print(f"DEBUG: Conteudo da primeira descricao: {fotos[0]['descricao']}")
    # ----------------------------------------------------------

    return render_template('turma.html', fotos=fotos, numero_turma=id_turma)

# ==========================================
# 1. FUNÇÕES DO BANCO DE DADOS (SQLite)
# ==========================================
def conectar_banco():
    conn = sqlite3.connect('banco_escola.db')
    conn.row_factory = sqlite3.Row
    return conn

def iniciar_banco():
    conn = conectar_banco()
    # Cria a tabela se ela ainda não existir
    conn.execute('''
        CREATE TABLE IF NOT EXISTS galeria (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            turma TEXT NOT NULL,
            materia TEXT NOT NULL,
            nome_arquivo TEXT NOT NULL,
            data_postagem TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Inicia o banco assim que o app rodar
iniciar_banco()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/logout')
def logout():
    session.clear() # Limpa o login do representante
    return redirect(url_for('index'))

# ==========================================
# 3. PROCESSAMENTO DE UPLOAD (A "Mágica")
# ==========================================

@app.route('/upload_foto', methods=['POST'])
def upload_foto():
    # 1. Verifica se o representante está logado
    if 'representante_logado' not in session:
        return redirect(url_for('login_rep'))

    # 2. Pega os dados do formulário (incluindo a nova descrição)
    turma = session['representante_logado']
    materia = request.form.get('materia')
    descricao = request.form.get('descricao_foto') # Pega o texto do seu novo campo
    file = request.files.get('arquivo_foto')

    # 3. Verifica se o arquivo é válido
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Cria um nome único com data e hora
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S_')
        nome_final = timestamp + filename
        
        # 4. Salva a imagem na pasta física
        caminho_completo = os.path.join(app.config['UPLOAD_FOLDER'], nome_final)
        file.save(caminho_completo)

        # 5. Salva TUDO no banco de dados (agora com 5 valores)
        conn = conectar_banco()
        conn.execute('''
            INSERT INTO galeria (turma, materia, descricao, nome_arquivo, data_postagem)
            VALUES (?, ?, ?, ?, ?)
        ''', (turma, materia, descricao, nome_final, datetime.now().strftime('%d/%m/%Y %H:%M')))
        conn.commit()
        conn.close()

        # 6. Redireciona de volta para a página de sucesso
        return redirect(url_for('upload_rep'))
    
    # Se der erro no arquivo
    return "Erro: Formato de arquivo inválido ou nenhum arquivo selecionado."

@app.route('/galeria')
def galeria():
    conn = conectar_banco()
    # Pega todas as fotos, começando pela mais recente
    fotos = conn.execute('SELECT * FROM galeria ORDER BY id DESC').fetchall()
    conn.close()
    return render_template('galeria.html', fotos=fotos)

# Esta rota é a "ponte" entre o Banco de Dados e o seu JavaScript do Modal
@app.route('/api/fotos/<turma>')
def api_fotos(turma):
    conn = conectar_banco()
    fotos = conn.execute('SELECT * FROM galeria WHERE turma = ? ORDER BY id DESC', (turma,)).fetchall()
    conn.close()

    lista = []
    for f in fotos:
        lista.append({
            'materia': f['materia'],
            'nome_arquivo': f['nome_arquivo'], # JS usa f.nome_arquivo
            'data_postagem': f['data_postagem'], # JS usa f.data_postagem
            'descricao': f['descricao'] # O CAMPO NOVO!
        })
    
    return jsonify(lista)

# Rota para deletar a foto
@app.route('/deletar_foto/<int:id_foto>')
def deletar_foto(id_foto):
    if 'representante_logado' not in session:
        return redirect(url_for('login_rep'))

    turma_sessao = str(session['representante_logado']) # Força virar texto
    conn = conectar_banco()
    
    # Busca a foto
    foto = conn.execute('SELECT * FROM galeria WHERE id = ?', (id_foto,)).fetchone()
    
    if foto:
        # Forçamos a comparação entre textos para evitar erro de tipo
        if str(foto['turma']) == turma_sessao:
            # 1. Deleta o arquivo físico
            caminho = os.path.join(app.config['UPLOAD_FOLDER'], foto['nome_arquivo'])
            if os.path.exists(caminho):
                os.remove(caminho)
            
            # 2. Deleta do Banco
            conn.execute('DELETE FROM galeria WHERE id = ?', (id_foto,))
            conn.commit()
    
    conn.close()
    return redirect(url_for('upload_rep'))


# SEMPRE A ÚLTIMA LINHA:
if __name__ == '__main__':
    app.run(debug=True)    
    
