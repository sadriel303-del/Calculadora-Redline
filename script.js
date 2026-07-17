    const database = {
        "Full Tuning": { "Full": 1000000 },
        "Motor": { "Motor Nv1": 92000, "Motor Nv2": 109000, "Motor Nv3": 128000, "Motor Nv4": 260000 },
        "Freio": { "Freio Nv1": 52000, "Freio Nv2": 67000, "Freio Nv3": 88000, "Freio Nv4": 200000 },
        "Transmissão": { "Transmissão Nv1": 72000, "Transmissão Nv2": 89000, "Transmissão Nv3": 110000, "Transmissão Nv4": 240000 },
        "Suspensão": { "Suspensão Nv1": 72000, "Suspensão Nv2": 118000, "Suspensão Nv3": 188000, "Suspensão Nv4": 215000 },
        "Turbo": { "Turbo": 300000 },
        "Blindagem": { "Blindagem Nv1": 165000, "Blindagem Nv2": 235000, "Blindagem Nv3": 330000, "Blindagem Nv4": 480000, "Blindagem Nv5": 600000, "Blindagem Roda": 50000000 },
        "Pinturas": { "Pintura Primaria": 14000, "Pintura Secundaria": 24000, "Cromado": 120000, "Perolado": 24000, "Decalque": 26000 },
        "Rodas": { "Roda": 62000, "Cor da Roda": 32000, "Custom Roda": 28000, "Fumaça de Pneu": 28000 },
        "Iluminação": { "Neon": 80000, "Xênon": 80000 },
        "Interior": { "Bancos": 22000, "Painel": 24000, "Ponteiros": 24000, "Enfeites": 24000, "Janela": 22000, "insulfilm": 15000, "Buzina": 18000, "Placa": 18000 },
        "Partes Externas": { "Aerofólio": 26000, "Para-Choque Dianteiro": 26000, "Para-Choque Traseiro": 26000, "Saias Laterais": 26000, "Escapamento": 26000, "Capa do Farol": 26000, "Portas": 26000, "Gaiola": 26000, "Grelha": 26000, "Capô": 26000, "Para-Lama": 24000, "Teto": 24000 }
    };

    const tabMenu = document.getElementById('tab-menu');
    const pagesContainer = document.getElementById('pages-container');
    const totalDisplay = document.getElementById('total-geral');

    function switchTab(categoryId) {
        document.querySelectorAll('.tab-btn, .category-page').forEach(el => el.classList.remove('active'));
        document.getElementById(`btn-${categoryId}`).classList.add('active');
        document.getElementById(`page-${categoryId}`).classList.add('active');
    }

    function calcular() {
        let total = 0;
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if(checkbox.checked) total += parseFloat(checkbox.dataset.preco);
        });
        totalDisplay.innerText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    }

    Object.entries(database).forEach(([cat, itens], index) => {
        const catId = cat.replace(/\s/g, '').toLowerCase();

        const btn = document.createElement('button');
        btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        btn.id = `btn-${catId}`;
        btn.innerText = cat;
        btn.onclick = () => switchTab(catId);
        tabMenu.appendChild(btn);

        const page = document.createElement('div');
        page.className = `category-page ${index === 0 ? 'active' : ''}`;
        page.id = `page-${catId}`;

        Object.entries(itens).forEach(([nome, preco]) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <div class="item-info">
                    <strong>${nome}</strong>
                    <span>R$ ${preco.toLocaleString('pt-BR')}</span>
                </div>
                <label class="switch">
                    <input type="checkbox" data-preco="${preco}" onchange="calcular()">
                    <span class="slider"></span>
                </label>
            `;
            page.appendChild(itemDiv);
        });
        pagesContainer.appendChild(page);
    });
