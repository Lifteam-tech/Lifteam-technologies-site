# Lifteam Digital Partners — Brique 04 : Backend Contract

Cette brique prépare l'intégration sécurisée du programme d'affiliation dans V4.

## Principe

Le site V4 reste le front-end. Les fonctions sensibles doivent être exécutées côté serveur :
- comptes utilisateurs ;
- validation des partenaires ;
- attribution des ventes ;
- calcul des commissions ;
- validation/rejet des commissions ;
- paiements ;
- détection d'anomalies ;
- protection des contenus numériques.

## Flux de référence

1. Le visiteur arrive avec `?ref=LP-0001`.
2. Le front-end conserve temporairement la référence pour transmettre l'intention d'affiliation.
3. Lors d'une commande, le serveur reçoit la référence et détermine l'affilié.
4. Le serveur calcule la commission selon le niveau réel du partenaire.
5. La commission reste `pending` jusqu'à validation.
6. Après validation, elle peut passer à `payable`, puis `paid`.

## API proposée

POST /api/affiliate/click
POST /api/orders
POST /api/affiliate/attribute
POST /api/affiliate/validate
GET  /api/affiliate/dashboard
GET  /api/affiliate/commissions
POST /api/affiliate/payout

## Règle critique

Le navigateur ne doit jamais être l'autorité pour :
- le montant d'une commission ;
- le niveau d'un affilié ;
- la validation d'une vente ;
- le statut d'un paiement.

Ces valeurs doivent être recalculées et contrôlées côté serveur.

## Statuts

Partner:
pending | approved | suspended | rejected | disabled

Commission:
pending | validated | rejected | payable | paid

## Objet minimal d'une vente

{
  "order_id": "ORD-000001",
  "customer_id": "CUS-000001",
  "product_id": "DE0ADIGITAL",
  "partner_id": "LP-0001",
  "order_amount": 20.00,
  "commission_rate": 0.40,
  "commission_amount": 8.00,
  "status": "pending"
}

Cette structure est un contrat de référence, pas un backend actif.
