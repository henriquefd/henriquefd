### Olá, eu sou o Henrique Delfino 👋

**Física (UFRGS) • AI Engineering (GenAI & Agentes) • Machine Learning & Engenharia de Dados**

[![Portfólio](https://img.shields.io/badge/Portfólio_&_Case_Studies-111827?style=for-the-badge&logo=githubpages&logoColor=white)](https://henriquefd.github.io/henriquefd/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/henrique-delfino-186851209/)
[![Gmail](https://img.shields.io/badge/riquefd0103@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:riquefd0103@gmail.com)

Graduando em Bacharelado em Física pela **UFRGS**, construo software na interseção entre modelagem matemática, ciência e Inteligência Artificial. Gosto de entender como sistemas complexos funcionam desde a base — da física estatística e eletrônica embarcada até a arquitetura interna de LLMs — para tirar ideias difíceis do papel e transformá-las em tecnologia resiliente no mundo real.

Atualmente atuo como pesquisador bolsista em Engenharia de Dados e Machine Learning no **Centro de Biotecnologia da UFRGS (LaBiMP)** e desenvolvo arquiteturas de **IA Generativa local-first, agentes autônomos e segurança em LLMs**.

---

### 🏗️ Sistemas & Arquiteturas em Construção
*(Meus repositórios principais são privados por sigilo científico e segurança — veja os detalhes visuais e demonstrações no [meu portfólio](https://henriquefd.github.io/henriquefd/).)*

* **🤖 OBEY — Assistente Autônomo Local-First & Orquestrador Multiagente**
  * **Arquitetura:** Sistema modular em Python (`56.791` linhas, `187` módulos) integrando modelos locais (**Ollama**) e em nuvem (**Claude / Gemini**), com servidor **MCP (Model Context Protocol)** para automação de interface e *prompt caching* (`-76%` em TTFT).
  * **Segurança & Confiabilidade:** Proteção contra *prompt injection* inspirada na arquitetura **CaMeL** (*taint tracking*, quarentena JSON e consentimento SHA-256 validados em 16 famílias do AgentDojo + 38 vetores de ataque).
  * **Engenharia & Áudio:** Roteamento determinístico (`< 0,4 ms`), observabilidade via **OpenTelemetry GenAI**, suíte com **2.406 testes** (Pytest, análise AST e testes de mutação) e pipeline de voz quantizado em GPU/ONNX Runtime (*Faster-Whisper, Silero VAD, Piper TTS*) com *barge-in* de `0,20 ms` e redação local de PII.

* **🧬 Pipelines de Dados & ML para Vigilância Genômica (LaBiMP / UFRGS)**
  * **Engenharia de Dados & Backend:** Construção de pipelines automatizados de ingestão, sanitização e cruzamento de dados tabulares de alta dimensionalidade e séries temporais (INMET), além de plataformas web em **Django** com integridade transacional (`transaction.atomic`).
  * **Modelagem & Explicabilidade (XAI):** Treinamento de modelos supervisionados (**Random Forest**) e redução de dimensionalidade (**PCA**), utilizando validação cruzada estratificada e valores **SHAP** para interpretabilidade científica.

* **☀️ Calculadora Solar — Recuperação de Séries Meteorológicas via ML**
  * **Pipeline & Empacotamento:** ETL e *feature engineering* sobre `35 mil` registros horários para reconstrução de `366` dias sem medição ($R^2 = 0,903$ | MAE de `0,85 h/dia`), empacotado em aplicação desktop autônoma (**Joblib, Eel, Plotly, PyInstaller**) para uso direto por pesquisadores sem ambiente Python.

---

### 🛠️ Stack Tecnológica

#### IA Generativa, LLMs & Agentes
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_API-191919?style=for-the-badge&logo=anthropic&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![MCP](https://img.shields.io/badge/MCP_Servers-2D3748?style=for-the-badge)
![RAG](https://img.shields.io/badge/RAG_&_Vector_DBs-4A5568?style=for-the-badge)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
![ONNX Runtime](https://img.shields.io/badge/ONNX_Runtime-005CED?style=for-the-badge&logo=onnx&logoColor=white)

#### Machine Learning & Ciência de Dados
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![SciPy](https://img.shields.io/badge/SciPy-8CAAE6?style=for-the-badge&logo=scipy&logoColor=black)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![SHAP](https://img.shields.io/badge/SHAP_(XAI)-FF0051?style=for-the-badge)
![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)

#### Engenharia de Software, MLOps & Sistemas
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-425CC7?style=for-the-badge&logo=opentelemetry&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

### 🔭 Foco Atual
* **Explorando:** Orquestração determinística de agentes, defesa contra *prompt injection* em arquiteturas híbridas e inferência de baixa latência.
* **Buscando:** Oportunidades em **AI Engineering, GenAI ou Engenharia de Dados** onde rigor analítico e engenharia de software de ponta gerem impacto prático.
