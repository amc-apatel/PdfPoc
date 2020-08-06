import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
} from 'react-native';
import RNImageToPdf from 'react-native-image-to-pdf';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { styles } from './styles';
import ViewShot from 'react-native-view-shot';


export class BaseContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUri: undefined
        }
    }


    componentDidMount() {

    }

    captureScreen = () => {
        this.refs.viewShot.capture().then(uri => {
            const image = { uri: uri };
            this.setState({ imageUri: image })
            console.log("do something with ImageUri", JSON.stringify(this.state.imageUri));

        });
    }

    render() {
        return (
            <SafeAreaView>

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <ViewShot captureMode="mount" ref="viewShot" options={{ format: "png", quality: 0.9 }}>

                        {this.state.imageUri && (<Image resizeMode="contain"
                            style={styles.imageStyle} source={this.state.imageUri}></Image>)}
                        {this.state.imageUri && (<Button title='Create PDF' onPress={() => this.createPdf()} />)}
                        {!this.state.imageUri && (<Header />)}

                        {!this.state.imageUri && (<Button title='Capture screen' onPress={() => this.captureScreen()} />
                        )}
                        {global.HermesInternal == null ? null : (
                            <View style={styles.engine}>
                                <Text style={styles.footer}>Engine: Hermes</Text>
                            </View>
                        )}

                        {!this.state.imageUri && (
                            <View style={styles.body}>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>Step One</Text>
                                    <Text style={styles.sectionDescription}>
                                        Edit <Text style={styles.highlight}>App.js</Text> to change this
                    screen and then come back to see your edits.
                  </Text>
                                </View>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>See Your Changes</Text>
                                    <Text style={styles.sectionDescription}>
                                        <ReloadInstructions />
                                    </Text>
                                </View>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>Debug</Text>
                                    <Text style={styles.sectionDescription}>
                                        <DebugInstructions />
                                    </Text>
                                </View>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>Learn More</Text>
                                    <Text style={styles.sectionDescription}>
                                        Read the docs to discover what to do next:
                  </Text>
                                </View>
                                <LearnMoreLinks />
                            </View>
                        )}
                    </ViewShot>

                </ScrollView>
            </SafeAreaView>

        )
    }

     async createPdf () {
        try {
            const options = {
                imagePaths: [this.state.imageUri.uri],
                name: 'PDFName',
                quality: .7, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            console.log(pdf.filePath);
        } catch(e) {
            console.log(e);
        }
    }
   

    // async createPdf() {
    //     // Create a PDF page with text and images
    //     const jpgPath = this.state.imageUri.uri
    //     console.log('BaseContainer', "jpegPath: "+ jpgPath);
    //     const page2 = PDFPage
    //         .create()
    //         .setMediaBox(250, 250)
    //         .drawText("Some text!!!", {
    //             x: 5,
    //             y: 10,
    //             color: "#F62727",
    //             fontName: "Times New Roman"
    //           })
    //         .drawImage(jpgPath, 'jpg', {
    //             x: 5,
    //             y: 125,
    //             width: 250,
    //             height: 1000,
    //         })

    //     // Create a new PDF in your app's private Documents directory
    //     const docsDir = await PDFLib.getDocumentsDirectory();
    //     const pdfPath = `${docsDir}/sample.pdf`;
    //     PDFDocument
    //         .create(pdfPath)
    //         .addPages(page2)
    //         .write() // Returns a promise that resolves with the PDF's path
    //         .then(path => {
    //             console.log('PDF created at: ' + path);
    //             // Do stuff with your shiny new PDF!
    //         });
    // }
}