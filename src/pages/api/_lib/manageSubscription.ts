import { query as q } from 'faunadb';
import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {

  console.log('saveSubscription');
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_customer_id'),
          customerId
        )
      )
    )
  );
  console.log('criando userRef',userRef );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  console.log('criando stripe',subscription);
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if(createAction){
    console.log('criando',subscriptionData);

    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    );
  } else {
    console.log('alterando');
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }
  return;
}
