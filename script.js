/* =========================================================
   VÉRTICE IA
   JAVASCRIPT PRINCIPAL
   ========================================================= */

   document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. MENU MOBILE
       ===================================================== */

    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const menuIcon = document.getElementById('menuIcon');

    function toggleMobileMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');

        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');

            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');

            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });


    /* =====================================================
       2. HERO - CHAT INTERATIVO
       ===================================================== */

    const heroChatContainer =
        document.getElementById('heroChatContainer');

    let heroHistory = [
        {
            sender: 'user',
            text: 'Olá! Qual o horário de atendimento e valores dos agentes?'
        },
        {
            sender: 'ai',
            text: 'Olá! Sou o agente Vértice IA. ⚡ Atendemos 24 horas por dia! Temos planos acessíveis a partir de R$ 97/mês. Como posso ajudar seu negócio hoje?'
        }
    ];

    function renderHeroChat() {

        heroChatContainer.innerHTML = '';

        heroHistory.forEach(msg => {

            const bubble = document.createElement('div');

            bubble.className =
                `chat-bubble-anim flex ${
                    msg.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                }`;

            if (msg.sender === 'user') {

                bubble.innerHTML = `
                    <div class="bg-purple-600 text-white rounded-2xl rounded-tr-none px-3.5 py-2 max-w-[85%] text-xs shadow-md">
                        ${escapeHTML(msg.text)}
                    </div>
                `;

            } else {

                bubble.innerHTML = `
                    <div class="bg-white/10 text-gray-200 rounded-2xl rounded-tl-none px-3.5 py-2 max-w-[85%] text-xs border border-white/10 shadow-md">
                        <span class="text-[10px] font-bold text-purple-300 block mb-0.5">
                            Vértice IA Agent
                        </span>

                        ${escapeHTML(msg.text)}
                    </div>
                `;
            }

            heroChatContainer.appendChild(bubble);
        });

        heroChatContainer.scrollTop =
            heroChatContainer.scrollHeight;
    }

    function sendHeroPrompt(type) {

        let userMsg = '';
        let aiMsg = '';

        if (type === 'preco') {

            userMsg =
                'Quanto custa para implementar no meu WhatsApp?';

            aiMsg =
                'Nossos planos começam no Starter por R$ 97/mês e o Pro por R$ 297/mês com mensagens ilimitadas no WhatsApp + Instagram!';

        } else if (type === 'agendar') {

            userMsg =
                'Como funciona o agendamento de horários?';

            aiMsg =
                'O agente consulta sua agenda em tempo real, mostra os horários disponíveis ao cliente e confirma o agendamento direto no chat!';

        } else if (type === 'catalogo') {

            userMsg =
                'Vocês enviam o catálogo de produtos automaticamente?';

            aiMsg =
                'Com certeza! O agente lê sua base de dados e envia os links do catálogo ou fotos específicas instantaneamente.';

        } else if (type === 'qualificar') {

            userMsg =
                'Como o agente qualifica os leads antes de mandar para o vendedor?';

            aiMsg =
                'Ele faz perguntas chave (ex: orçamento, prazo, interesse), classifica o lead e envia o resumo pronto para seu consultor fechar!';
        }

        heroHistory.push({
            sender: 'user',
            text: userMsg
        });

        renderHeroChat();

        const typingBubble =
            document.createElement('div');

        typingBubble.id = 'heroTyping';

        typingBubble.className =
            'flex justify-start text-xs';

        typingBubble.innerHTML = `
            <div class="bg-white/10 text-gray-400 rounded-2xl rounded-tl-none px-3.5 py-2 flex items-center gap-1 border border-white/10">
                <span class="typing-dot">.</span>
                <span class="typing-dot">.</span>
                <span class="typing-dot">.</span>
            </div>
        `;

        heroChatContainer.appendChild(typingBubble);

        heroChatContainer.scrollTop =
            heroChatContainer.scrollHeight;

        setTimeout(() => {

            const element =
                document.getElementById('heroTyping');

            if (element) {
                element.remove();
            }

            heroHistory.push({
                sender: 'ai',
                text: aiMsg
            });

            renderHeroChat();

        }, 700);
    }

    document.querySelectorAll('.hero-prompt').forEach(button => {

        button.addEventListener('click', () => {

            const type =
                button.dataset.heroPrompt;

            sendHeroPrompt(type);
        });
    });

    renderHeroChat();


    /* =====================================================
       3. SOLUÇÕES POR SEGMENTO
       ===================================================== */

    const segmentData = {

        saude: {
            title: 'Clínicas & Profissionais da Saúde',

            dor:
                'Secretária sobrecarregada no telefone enquanto pacientes aguardam confirmações de consulta e tabela de convênios.',

            solucao:
                'Agente que faz pré-agendamento de consultas, envia orientações pré-exame e confirma presença automaticamente pelo WhatsApp.',

            metric:
                'Redução de 45% na taxa de faltas (no-show)',

            icon: 'fa-hospital',

            mockupText:
                'Olá! Aceitam o convênio Unimed e quais horários têm para consulta ortopédica?',

            aiResponse:
                'Olá! Aceitamos Unimed sim. Para ortopedia temos horários disponíveis nesta quinta às 14:30 ou sexta às 09:00. Qual prefere reservar?'
        },

        ecommerce: {

            title:
                'E-commerce & Lojas Virtuais',

            dor:
                'Clientes abandonando o carrinho no site por dúvidas simples de frete, tamanho ou forma de pagamento fora do expediente.',

            solucao:
                'Atendimento 24/7 com recomendação de produtos, consulta de status de pedido e envio de chaves Pix para pagamento rápido.',

            metric:
                '+35% nas vendas realizadas no período noturno',

            icon:
                'fa-cart-shopping',

            mockupText:
                'Boa noite! Qual o prazo de entrega para o CEP 01310-100?',

            aiResponse:
                'Boa noite! Para esse CEP o frete expresso chega em até 2 dias úteis por R$ 14,90. Deseja finalizar o pedido com este frete agora?'
        },

        imobiliaria: {

            title:
                'Imobiliárias & Corretores',

            dor:
                'Demora no atendimento de portais imobiliários faz o cliente interessado procurar outro imóvel em poucos minutos.',

            solucao:
                'Qualificação instantânea do perfil do comprador (bairro, orçamento, número de quartos) e agendamento de visitas com o corretor.',

            metric:
                'Tempo de resposta reduzido de 3 horas para 2 segundos',

            icon:
                'fa-building-user',

            mockupText:
                'Tenho interesse no apartamento anunciado no Jardins com 3 suítes.',

            aiResponse:
                'Excelente escolha! O imóvel possui 140m² e 2 vagas. Você busca comprar à vista ou financiamento? Posso agendar sua visita para amanhã às 10h!'
        },

        infoprodutos: {

            title:
                'Infoprodutos & Cursos Online',

            dor:
                'Dúvidas recorrentes em lançamentos sobre conteúdo programático, acesso à plataforma e garantia de 7 dias.',

            solucao:
                'Agente que tira dúvidas da página de vendas, envia depoimentos em vídeo e direciona o aluno para o checkout correto.',

            metric:
                'Aumento de 28% no ROI de campanhas de tráfego',

            icon:
                'fa-graduation-cap',

            mockupText:
                'O curso oferece certificado reconhecido e acesso vitalício?',

            aiResponse:
                'Sim! O curso concede certificado digital ao concluir todas as aulas e você terá acesso ilimitado por 2 anos com suporte a dúvidas!'
        },

        servicos: {

            title:
                'Serviços Profissionais & Consultoria',

            dor:
                'Horas gastas explicando os mesmos serviços e enviando propostas para clientes sem orçamento disponível.',

            solucao:
                'Triagem automatizada de demanda com cálculo estimativo e encaminhamento de propostas personalizadas aos leads qualificados.',

            metric:
                '+20 horas economizadas por semana em reuniões inúteis',

            icon:
                'fa-briefcase',

            mockupText:
                'Gostaria de solicitar um orçamento para consultoria contábil da minha empresa.',

            aiResponse:
                'Perfeito! Qual o regime tributário atual (Simples, Lucro Presumido) e quantos funcionários possuem? Com isso já gero sua estimativa!'
        }
    };

    const segmentContainer =
        document.getElementById('segmentDisplayContainer');

    function switchSegment(key) {

        document.querySelectorAll('.segment-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        const activeTab =
            document.querySelector(
                `.segment-tab[data-segment="${key}"]`
            );

        if (activeTab) {
            activeTab.classList.add('active');
        }

        const data = segmentData[key];

        if (!data) return;

        segmentContainer.innerHTML = `

            <div class="grid lg:grid-cols-12 gap-8 items-center">

                <div class="lg:col-span-7 space-y-6">

                    <div class="inline-flex items-center gap-2 text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">

                        <i class="fa-solid ${data.icon}"></i>

                        <span>
                            ${escapeHTML(data.title)}
                        </span>

                    </div>

                    <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                        Resultados reais para o seu nicho
                    </h3>

                    <div class="space-y-4">

                        <div class="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">

                            <p class="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                                🚨 Principal Desafio do Setor:
                            </p>

                            <p class="text-sm text-gray-200">
                                ${escapeHTML(data.dor)}
                            </p>

                        </div>

                        <div class="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">

                            <p class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                                ✨ Solução Aplicada pelo Agente Vértice:
                            </p>

                            <p class="text-sm text-gray-200">
                                ${escapeHTML(data.solucao)}
                            </p>

                        </div>

                    </div>

                    <div class="pt-2 flex items-center gap-3 text-xs font-semibold text-purple-300">

                        <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>

                        <span>
                            Impacto Mensurável:
                            ${escapeHTML(data.metric)}
                        </span>

                    </div>

                </div>

                <div class="lg:col-span-5">

                    <div class="bg-[#0e0f21] rounded-2xl p-5 border border-white/10 shadow-xl space-y-3">

                        <div class="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-gray-400">

                            <span>
                                Preview do Atendimento
                            </span>

                            <span class="text-emerald-400 flex items-center gap-1">

                                <i class="fa-solid fa-circle text-[8px]"></i>

                                IA Respondeu em 1s

                            </span>

                        </div>

                        <div class="space-y-3 py-2 text-xs">

                            <div class="bg-purple-600/30 text-purple-100 p-3 rounded-xl rounded-tr-none border border-purple-500/30 ml-auto max-w-[90%]">
                                "${escapeHTML(data.mockupText)}"
                            </div>

                            <div class="bg-white/10 text-gray-200 p-3 rounded-xl rounded-tl-none border border-white/10 max-w-[90%]">

                                <span class="text-[10px] text-purple-300 font-bold block mb-1">
                                    Vértice IA Agent:
                                </span>

                                "${escapeHTML(data.aiResponse)}"

                            </div>

                        </div>

                        <div class="pt-2 text-center border-t border-white/10">

                            <a
                                href="#demo"
                                class="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center justify-center gap-1"
                            >

                                <span>
                                    Testar essa lógica no simulador
                                </span>

                                <i class="fa-solid fa-arrow-right text-[10px]"></i>

                            </a>

                        </div>

                    </div>
                </div>
            </div>
        `;
    }

    document.querySelectorAll('.segment-tab').forEach(button => {

        button.addEventListener('click', () => {

            switchSegment(
                button.dataset.segment
            );
        });
    });

    switchSegment('saude');


    /* =====================================================
       4. DEMONSTRAÇÃO INTERATIVA
       ===================================================== */

    const customDemoChatBox =
        document.getElementById('customDemoChatBox');

    const customDemoInput =
        document.getElementById('customDemoInput');

    const sendDemoBtn =
        document.getElementById('sendDemoBtn');

    const resetDemoBtn =
        document.getElementById('resetDemoBtn');

    let demoHistory = [
        {
            sender: 'ai',
            text:
                'Olá! Seja bem-vindo à demonstração ao vivo da Vértice IA. Digite qualquer pergunta ou simule uma dúvida do seu cliente!'
        }
    ];

    function renderCustomDemoChat() {

        customDemoChatBox.innerHTML = '';

        demoHistory.forEach(msg => {

            const item =
                document.createElement('div');

            item.className =
                `flex ${
                    msg.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                }`;

            if (msg.sender === 'user') {

                item.innerHTML = `
                    <div class="bg-purple-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] shadow-md">
                        ${escapeHTML(msg.text)}
                    </div>
                `;

            } else {

                item.innerHTML = `
                    <div class="bg-white/10 text-gray-200 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] border border-white/10 shadow-md">

                        <span class="text-[10px] font-bold text-purple-300 block mb-0.5">
                            Agente Vértice IA
                        </span>

                        ${escapeHTML(msg.text)}

                    </div>
                `;
            }

            customDemoChatBox.appendChild(item);
        });

        customDemoChatBox.scrollTop =
            customDemoChatBox.scrollHeight;
    }

    function resetDemoChat() {

        demoHistory = [
            {
                sender: 'ai',
                text:
                    'Chat reiniciado! Pode digitar qualquer mensagem para testar a inteligência do agente.'
            }
        ];

        renderCustomDemoChat();
    }

    function sendCustomDemoMessage() {

        const text =
            customDemoInput.value.trim();

        if (!text) return;

        demoHistory.push({
            sender: 'user',
            text
        });

        customDemoInput.value = '';

        renderCustomDemoChat();

        const typingDiv =
            document.createElement('div');

        typingDiv.id = 'demoTyping';

        typingDiv.className =
            'flex justify-start text-xs';

        typingDiv.innerHTML = `
            <div class="bg-white/10 text-gray-400 rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-1 border border-white/10">

                <span class="typing-dot">.</span>
                <span class="typing-dot">.</span>
                <span class="typing-dot">.</span>

            </div>
        `;

        customDemoChatBox.appendChild(typingDiv);

        customDemoChatBox.scrollTop =
            customDemoChatBox.scrollHeight;

        setTimeout(() => {

            const element =
                document.getElementById('demoTyping');

            if (element) {
                element.remove();
            }

            const lower =
                text.toLowerCase();

            let reply = '';

            if (
                lower.includes('preço') ||
                lower.includes('valor') ||
                lower.includes('quanto') ||
                lower.includes('plano')
            ) {

                reply =
                    'Nossos planos começam em R$ 97/mês (Starter) para profissionais autônomos e R$ 297/mês (Pro) com mensagens ilimitadas no WhatsApp! Deseja ver os detalhes completos?';

            } else if (
                lower.includes('agendar') ||
                lower.includes('horário') ||
                lower.includes('marcar')
            ) {

                reply =
                    'Com certeza! O agente integra com Google Agenda e sistemas de agendamento para confirmar datas sem intervenção humana.';

            } else if (
                lower.includes('whatsapp') ||
                lower.includes('instagram') ||
                lower.includes('canal')
            ) {

                reply =
                    'Oferecemos integração oficial e segura no WhatsApp, Instagram Direct e Web Chat, permitindo gerenciar tudo em um painel unificado!';

            } else if (
                lower.includes('humano') ||
                lower.includes('suporte') ||
                lower.includes('atendente')
            ) {

                reply =
                    'Sempre que a conversa demandar atenção especial, o agente faz o transbordo para sua equipe humana no WhatsApp com todo o histórico!';

            } else if (
                lower.includes('teste') ||
                lower.includes('gratis') ||
                lower.includes('demo')
            ) {

                reply =
                    "Você pode testar e ativar sua conta em menos de 10 minutos! Clique no botão 'Começar Agora' no topo da página.";

            } else {

                reply =
                    `Entendi sua dúvida sobre "${text}". O agente Vértice IA responde com precisão utilizando a base de conhecimento do seu próprio negócio!`;
            }

            demoHistory.push({
                sender: 'ai',
                text: reply
            });

            renderCustomDemoChat();

        }, 800);
    }

    sendDemoBtn.addEventListener(
        'click',
        sendCustomDemoMessage
    );

    resetDemoBtn.addEventListener(
        'click',
        resetDemoChat
    );

    customDemoInput.addEventListener(
        'keydown',
        event => {

            if (event.key === 'Enter') {
                sendCustomDemoMessage();
            }
        }
    );

    renderCustomDemoChat();


    /* =====================================================
       5. PLANOS - MENSAL / ANUAL
       ===================================================== */

    const btnMensal =
        document.getElementById('btnMensal');

    const btnAnual =
        document.getElementById('btnAnual');

    const priceStarter =
        document.getElementById('price-starter');

    const pricePro =
        document.getElementById('price-pro');

    const periodStarter =
        document.getElementById('period-starter');

    const periodPro =
        document.getElementById('period-pro');

    function setBilling(type) {

        if (type === 'anual') {

            btnAnual.classList.add('active');
            btnMensal.classList.remove('active');

            priceStarter.textContent = '77';
            pricePro.textContent = '237';

            periodStarter.textContent =
                'Cobrado anualmente (R$ 924/ano)';

            periodPro.textContent =
                'Cobrado anualmente (R$ 2.844/ano)';

        } else {

            btnMensal.classList.add('active');
            btnAnual.classList.remove('active');

            priceStarter.textContent = '97';
            pricePro.textContent = '297';

            periodStarter.textContent =
                'Cobrado mensalmente';

            periodPro.textContent =
                'Cobrado mensalmente';
        }
    }

    document.querySelectorAll('[data-billing]').forEach(button => {

        button.addEventListener('click', () => {

            setBilling(
                button.dataset.billing
            );
        });
    });


    /* =====================================================
       6. FAQ ACCORDION
       ===================================================== */

    const faqButtons =
        document.querySelectorAll('[data-faq]');

    function toggleFaq(index) {

        const answer =
            document.getElementById(
                `faq-answer-${index}`
            );

        const icon =
            document.getElementById(
                `faq-icon-${index}`
            );

        const isHidden =
            answer.classList.contains('hidden');

        for (let i = 0; i < 5; i++) {

            const currentAnswer =
                document.getElementById(
                    `faq-answer-${i}`
                );

            const currentIcon =
                document.getElementById(
                    `faq-icon-${i}`
                );

            if (currentAnswer) {
                currentAnswer.classList.add('hidden');
            }

            if (currentIcon) {
                currentIcon.style.transform =
                    'rotate(0deg)';
            }
        }

        if (isHidden) {

            answer.classList.remove('hidden');

            icon.style.transform =
                'rotate(180deg)';
        }
    }

    faqButtons.forEach(button => {

        button.addEventListener('click', () => {

            toggleFaq(
                Number(button.dataset.faq)
            );
        });
    });


    /* =====================================================
       7. SEGURANÇA BÁSICA PARA TEXTO DINÂMICO
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

});
