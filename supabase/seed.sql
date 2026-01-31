-- Seed Agencies
INSERT INTO public.agencies (id, name, address, phone, email, description, logo_url, creci)
VALUES
(1, 'Imobiliária Central do Bairro', 'Av. Principal, 1234 - Centro Comercial', '(11) 99999-1234', 'contato@centraldobairro.com.br', 'Há 20 anos realizando sonhos no bairro. Especialistas em imóveis residenciais e comerciais de alto padrão. Nossa equipe jurídica garante total segurança na sua negociação.', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200', '12.345-J'),
(2, 'Novo Lar Imóveis', 'Rua das Flores, 567 - Sala 12', '(11) 98888-5678', 'atendimento@novolar.com.br', 'Uma nova forma de morar. Focados em apartamentos compactos e studios modernos. Agilidade e tecnologia para quem não tem tempo a perder.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200', '23.456-J'),
(3, 'Bairro Nobre Consultoria', 'Praça da Matriz, 89 - Térreo', '(11) 97777-9012', 'consultoria@bairronobre.com.br', 'Consultoria personalizada para investimentos imobiliários. Encontre as melhores oportunidades de valorização na região.', 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=200', '34.567-J'),
(4, 'Exclusiva Imóveis', 'Av. dos Estados, 200 - Loja 4', '(11) 96666-3456', 'contato@exclusivaimoveis.com', 'Imóveis exclusivos que você só encontra aqui. Atendimento VIP e sigilo absoluto para clientes exigentes.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200', '45.678-J');

-- Reset sequence for agencies to avoid conflicts with future inserts
SELECT setval('agencies_id_seq', (SELECT MAX(id) FROM public.agencies));

-- Seed Properties
INSERT INTO public.properties (title, price, location, bedrooms, bathrooms, area, images, type, description, features, agency_id, featured)
VALUES
('Apartamento com Vista para o Parque', 850000, 'Rua das Flores, 123', 3, 2, 98, ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'], 'Venda', 'Excelente apartamento com vista definitiva para o parque. Acabamento de alto padrão, varanda gourmet e condomínio com lazer completo. Localização privilegiada próxima a escolas e supermercados.', ARRAY['Varanda Gourmet', 'Vista Panorâmica', 'Piscina', 'Academia', '2 Vagas'], 1, true),

('Casa Charmosa em Vila Fechada', 1200000, 'Travessa do Sol, 45', 4, 3, 180, ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800'], 'Venda', 'Casa única em vila fechada com segurança 24h. Arquitetura moderna com toques rústicos, amplo jardim e área de churrasqueira privativa. Perfeito para famílias que buscam tranquilidade.', ARRAY['Vila Fechada', 'Jardim', 'Churrasqueira', 'Lareira', 'Escritório'], 2, true),

('Studio Moderno Perto do Metrô', 3500, 'Av. Principal, 500', 1, 1, 35, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'], 'Aluguel', 'Studio mobiliado e decorado, pronto para morar. Prédio novo com coworking, lavanderia e rooftop. A apenas 5 minutos a pé da estação de metrô.', ARRAY['Mobiliado', 'Próximo ao Metrô', 'Coworking', 'Lavanderia', 'Rooftop'], 3, true),

('Cobertura Duplex com Piscina', 2100000, 'Rua dos Nobres, 77', 4, 4, 250, ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'], 'Venda', 'Espetacular cobertura duplex com vista mar. Área de lazer privativa com piscina e churrasqueira. Acabamento de luxo em todos os ambientes.', ARRAY['Vista Mar', 'Piscina Privativa', 'Duplex', '4 Vagas', 'Depósito'], 1, false),

('Apartamento Compacto no Centro', 1800, 'Rua do Comércio, 320', 1, 1, 45, ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'], 'Aluguel', 'Praticidade e economia no coração da cidade. Próximo a todo tipo de comércio e serviço. Ideal para estudantes e solteiros.', ARRAY['Centro', 'Portaria 24h', 'Elevador', 'Perto de Tudo'], 2, false),

('Casa de Condomínio com 5 Suítes', 3200000, 'Alameda das Palmeiras, 10', 5, 6, 420, ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'], 'Venda', 'Mansão em condomínio de luxo. Amplo terreno, área gourmet completa, piscina aquecida e cinema privativo. Segurança armada e clube exclusivo.', ARRAY['Alto Padrão', 'Cinema', 'Piscina Aquecida', 'Segurança Armada', 'Clube'], 4, false);
