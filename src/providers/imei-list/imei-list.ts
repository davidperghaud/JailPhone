import { AlertController, App } from 'ionic-angular';
import { Injectable } from '@angular/core';
//graphql and apollo
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { SMS } from '@ionic-native/sms';
//Graphcool Queries

//To get all Phones Informations 
const queryAllPhones = gql`
  query AllPhones{
    allPhones(orderBy:createdAt_DESC){
      ownerName,
      imei,
      brand,
      ownerName,
      ownerEmail,
      ownerPhone
    }
  }
`;

//Get Phone informations for the FoundPage
const queryAllPhones_2 = gql`
  query AllPhones{
    allPhones{
      ownerName,
      imei,
      brand,
      ownerName,
      ownerEmail,
      ownerPhone
    }
  }
`;

//To registetr a Phone in the DataBase
const mutationCreatePhone = gql`
  mutation($imei: String!,$brand: String!,$ownerName:String!,$ownerEmail: String!,$ownerPhone:String!){
    createPhone(
      imei: $imei,
      brand: $brand,
      ownerName: $ownerName,
      ownerEmail: $ownerEmail,
      ownerPhone:$ownerPhone
    ) {
        id,
        imei,
        brand,
        ownerName,
        ownerEmail,
        ownerPhone
      }
  }
`;

//To delete a phone in the DataBase
const mutationDeletePhone = gql`
  mutation($id: ID!){
  deletePhone(id: $id) {
    id
  }
}
`;

/*
  Generated class for the ImeiListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImeiListProvider {
  my_data: Observable<any>;

  constructor(private apollo: Apollo, private alertCtrl: AlertController, private sms: SMS, public app:App) {
    console.log('Hello ImeiListProvider Provider');
  }

  getAllPhones(): Observable <any>{
    const queryWatcher = this.apollo.watchQuery<any>({
      query: queryAllPhones
    });

    return queryWatcher.valueChanges
      .map(result =>result.data.allPhones);;

  }

  //recupérer les informations du telephone retrouvé après la recherche
  getAllPhone_2(imei): Observable<any> {
    const queryWatcher = this.apollo.watchQuery<any>({
      query: queryAllPhones_2
    });

    return queryWatcher.valueChanges
      .map(result => result.data.allPhones.filter(i=> i.imei == imei));;

  }

  createPhone(imei,brand,ownerName,ownerEmail,ownerPhone): void {
    this.apollo.mutate({
      mutation: mutationCreatePhone,
      variables: {
        imei: imei,
        brand:brand,
        ownerName:ownerName,
        ownerEmail:ownerEmail,
        ownerPhone:ownerPhone
      },
      update: (proxy, { data: { createPhone } }) => {

        // Read the data from the cache for the allPhones query
        const data: any = proxy.readQuery({ query: queryAllPhones });

        // Add the new Phone to the data
        data.allPhones.push(createPhone);

        // Write the data back to the cache for the allPhones query
        proxy.writeQuery({ query: queryAllPhones, data });
      }
    })
      .subscribe(response =>{
        let alert = this.alertCtrl.create({
          title: 'Enregistré ✅',
          subTitle: 'Enregistrement effectué avec succès \n votre id est: ' + response.data.createPhone.id,
          buttons: ['OK']
        });
        alert.present();
        console.log(response.data.createPhone.id + '  '+ ownerPhone);
        this.sms.send(ownerPhone, 'votre id est: ' + response.data.createPhone.id);
      }
         ,
      error => {
        try {
          let msgError: any = error.networkError.name;
          if (msgError == "HttpErrorResponse") {
            let alert = this.alertCtrl.create({
              title: 'Connexion ⛔',
              subTitle: 'Vérifiez votre connexion internet',
              buttons: ['OK']
            });
            alert.present();

            console.log(error.networkError.name);
          }
        } catch (e) {
          console.log(e);
        }
        try {
          let gqlError: any = error.graphQLErrors[0].message;
          if (gqlError == "A unique constraint would be violated on Phone. Details: Field name = imei") {
            let alert = this.alertCtrl.create({
              title: 'Echec Enregistrement ⛔',
              subTitle: 'Ce téléphone a déjà été enregistré',
              buttons: ['OK']
            });
            alert.present();
            console.log(gqlError);
          }
        } catch (b) {
          console.log(b)
        }
        /* let msgError: any = error.networkError.name; */
       /*  if (msgError == "HttpErrorResponse") {
          let alert = this.alertCtrl.create({
            title: 'Connexion ⛔',
            subTitle: 'Vérifiez votre connexion internet',
            buttons: ['OK']
          });
          alert.present();

          console.log(error.networkError.name);
        } else {
          let alert = this.alertCtrl.create({
            title: "Enregistrement échoué ⛔",
            subTitle: 'Ce téléphone a déjà été enregistré',
            buttons: ['OK']
          });
          alert.present();
        }
         */
      });
  }

  //create phone and delete it when not found
  createPhone_2(imei, brand, ownerName, ownerEmail, ownerPhone): void {
    this.apollo.mutate({
      mutation: mutationCreatePhone,
      variables: {
        imei: imei,
        brand: brand,
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        ownerPhone: ownerPhone
      },
      update: (proxy, { data: { createPhone } }) => {

        // Read the data from the cache for the allPhones query
        const data: any = proxy.readQuery({ query: queryAllPhones });

        // Add the new Phone to the data
        data.allPhones.push(createPhone);

        // Write the data back to the cache for the allPhones query
        proxy.writeQuery({ query: queryAllPhones, data });
      }
    })
      .subscribe(response => {
        let alert = this.alertCtrl.create({
          title: 'Téléphone✅',
          subTitle: 'Téléphone sûr à 80%',
          buttons: ['OK']
        });
        alert.present();
        this.deletePhone_2(response.data.createPhone.id);
        console.log(response);
      }
        ,
        error => {
          //Management of errors

          //When the phone is not connected to the Internet
          try {
             let msgError: any = error.networkError.name;
              if (msgError == "HttpErrorResponse") {
                let alert = this.alertCtrl.create({
                  title: 'Connexion ⛔',
                  subTitle: 'Vérifiez votre connexion internet',
                  buttons: ['OK']
                });
                alert.present();

                console.log(error.networkError.name);
              }
          } catch (e) {
            console.log(e);
          }

          //When the phone is connected to the Internet but the id is not register in DataBase
          try {
            let gqlError: any = error.graphQLErrors[0].message;
            if (gqlError == "A unique constraint would be violated on Phone. Details: Field name = imei") {
              let alert = this.alertCtrl.create({
                title: 'Téléphone ⛔',
                subTitle: 'Ce téléphone a été volé ou perdu',
                buttons: ['OK']
              });
              alert.present();
              console.log(gqlError);
            }
          } catch (b) {
            console.log(b)
          }
          
        });
  }

  //when the user has found his found or if he want to sell his Phone already registered
  deletePhone(id): void {
    this.apollo.mutate({
      mutation: mutationDeletePhone,
      variables: {
        id: id
      },
      update: (proxy, { data: { deletePhone } }) => {
        // Read the data from the cache for the allPhones query
        let data: any = proxy.readQuery({ query: queryAllPhones });

        // Remove the Phone from the data
        data.allPhones = data.allPhones.filter(i => i.id !== deletePhone.id);

        // Write the data back to the cache for the allPhones query
        proxy.writeQuery({ query: queryAllPhones, data });
      }
    })
      .subscribe(response => {console.log(response.data);
        let alert = this.alertCtrl.create({
          title: 'Suppression ✅',
          subTitle: 'Le téléphone n\'est plus déclaré',
          buttons: ['OK']
        });
        alert.present();
      },
      error => {
        try {
          let msgError: any = error.networkError.name;
          if (msgError == "HttpErrorResponse") {
            let alert = this.alertCtrl.create({
              title: 'Connexion ⛔',
              subTitle: 'Vérifiez votre connexion internet',
              buttons: ['OK']
            });
            alert.present();

            console.log(error.networkError.name);
          }
        } catch (e) {
          console.log(e);
        }
        try {
          let gqlError: any = error.graphQLErrors[0].message;
          let errorMsg: any = "'Phone' has no item with id '" + id + "'";
          if (gqlError ==errorMsg ) {
            let alert = this.alertCtrl.create({
              title: 'Echec Suppression ⛔',
              subTitle: 'L\'id rentré n\'existe pas!',
              buttons: ['OK']
            });
            alert.present();
          }
        } catch (b) {
          console.log(b);
        }
        
      });
  }

  //when he search an IMEI we registered a phone with fake infos and we delete it automatically
  deletePhone_2(id): void {
    this.apollo.mutate({
      mutation: mutationDeletePhone,
      variables: {
        id: id
      },
      update: (proxy, { data: { deletePhone } }) => {
        // Read the data from the cache for the allPhones query
        let data: any = proxy.readQuery({ query: queryAllPhones });

        // Remove the Phone from the data
        data.allPhones = data.allPhones.filter(i => i.id !== deletePhone.id);

        // Write the data back to the cache for the allPhones query
        proxy.writeQuery({ query: queryAllPhones, data });
      }
    })
      .subscribe(response => {
        console.log(response.data);
      },
        error => {
          let alert = this.alertCtrl.create({
            title: 'Problème de connexion',
            subTitle: 'Verifiez votre connexion et réessayez svp!',
            buttons: ['OK']
          });
          alert.present();
        });
  }

}
