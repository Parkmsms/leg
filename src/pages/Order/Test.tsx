import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';


const AccordionView = (props: any) => {
    const [activeSections, setActiveSections] = useState([])

    const renderHeader = (section: any) => {
        return (
            <View >
                <Text>{section.title}</Text>
            </View>
        );
    };

    useEffect(() => {
        setActiveSections(props.data)
    }, [])

    const renderContent = (section: any) => {
        return (
            <View >
                <Text>{section.content2}</Text>
                {section.content?.map((menu: any, index: number) => {
                    return (
                        <SafeAreaView style={{ flexDirection: 'column' }} key={index}>
                            <Text>
                                {menu}
                            </Text>
                        </SafeAreaView>
                    )
                })}
            </View>
        );
    };

    //click Event ,전환
    const updateSections = (activeSections: any) => {
        setActiveSections(activeSections);
    };


    return (
        <Accordion
            // activeSections={[0]}
            // sections={['Section 1', 'Section 2', 'Section 3']}
            sections={activeSections}
            expandMultiple={true}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            underlayColor='rgba(0, 193, 222, 0.12)'

        />
    );
}

export default AccordionView;